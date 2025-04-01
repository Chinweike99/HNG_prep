import { query } from "../db/connection";
import { User, UserRole } from "../types/roles";



interface BasePost {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
}

type PostStatus = 'draft' | 'published' | 'archived';

export type Post<T extends PostStatus = PostStatus> = BasePost &{
    status: T;
} & (T extends 'draft' ? {
    scheduledPublish?: Date;
}: T extends 'published' ? {
    publishedAt: Date;
    views: number
}: {});


//COnditional type for post creation based on user role
export type PostCreationParams<T extends UserRole> = {
    title: string;
    content: string;
} & (T extends 'admin' ? {
    status: 'draft' | 'published';
    authorId?: 'editor';
}: T extends 'editor' ?{
    status: 'draft' | 'published';
} : {
    status: 'draft';
});


// Conditional return type based on user role
export type PostResponses<T extends UserRole> = {
    post: Post;
    canEdit: boolean;
    canDelete: boolean;
} & (T extends 'admin' ? {
    analytics: {
        views: number;
        likes: number;
    }
}: {});

export const createPost = async <T extends UserRole>(
    user: User<T>,
    params: PostCreationParams<T>
  ): Promise<Post> => {
    const authorId = 'authorId' in params && params.authorId ? params.authorId : user.id;
    const status = params.status || 'draft';
    
    const result = await query(
      `INSERT INTO posts (title, content, author_id, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [params.title, params.content, authorId, status]
    );
    
    return result.rows[0] as Post;
  };
  

// Role-guarded function example
export const getPostForUser: <T extends UserRole>(
    user: User<T>,
    postId: string
) => Promise<PostResponses<T>> = async (user, postId)=>{
    const result = await query('SELECT * FROM posts WHERE id = $1', [postId]);
    const post = result.rows[0] as Post;

    const isAdmin = user.role === 'admin';
    const isEditor = user.role === 'editor';
    const isAuthor = post.authorId === user.id;

    const baseResponse = {
        post,
        canEdit: isAdmin || (isEditor && isAuthor),
        canDelete: isAdmin
    };

    if(user.role === 'admin'){
        const analytics = await query(
            'SELECT views, likes FROM post_analytics WHERE post_id = $1', [postId]
        );

        return{
            ...baseResponse,
            analytics: analytics.rows[0] || { views: 0, likes: 0},
        } as PostResponses<typeof user.role>; 
    }
    return baseResponse as PostResponses<typeof user.role>;
}


// Overloads for Typscript inference
export function canPublishPost(user: User<'admin'>): true;
export function canPublishPost(user: User<'editor'>): boolean;
export function canPublishPost(user: User<'viewer'>): false;
export function canPublishPost(user: User): boolean {
    if(user.role === 'admin') return true;
    if(user.role === 'editor') return (user as User<'editor'>).canPublishPosts;
    return false;
}



