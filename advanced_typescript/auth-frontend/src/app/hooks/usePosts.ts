import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePostStore } from "../store/postStore";
import { boolean, string } from "zod";



export function usePosts(){
    const queryClient = useQueryClient();
    const {setPosts, setCurrentPost, setLoading, setError} = usePostStore();

    //Query to fetch all posts
    const {data: posts, isLoading, error, refetch} = useQuery({
        queryKey:['posts'],
        queryFn: async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/posts');
                if(!res.ok){
                    throw new Error("Failed to fetch posts");
                }
                const data = await res.json();
                setPosts(data.posts);
                return data.posts;

            } catch (error) {
                setError(error instanceof Error ? error.message : "An error has ocuured");
                return [];
            }finally{
                setLoading(false)
            }
        }
    });


    // Query to fetch a single post
    const getPost = async(id: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/posts/${id}`);
        if(!res.ok){
            throw new Error ('Failed to fetch post');
        }
        const data = await res.json();
        setCurrentPost(data.post);
        return data.post;
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unable to get a post");
            return null;
        }finally{
            setLoading(false);
        }

    }


    // Mutation to create a post
    const createPostMutation = useMutation({
        mutationFn: async (postData: {title: string; content: string; published?: boolean})=>{
            const res = await fetch('/api/posts',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if(!res.ok){
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to create post')
            }
            const data = await res.json();
            return data.post;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
        },
    });

    

    // Mutation to update a post
    const updatePostMutation = useMutation({
        mutationFn: async ({id, ...postData}: {id: string; title?: string; content?: string; published?: boolean}) => {
            const res = await fetch(`/api/post/${id}`,{
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if(!res.ok){
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to update post');
            }
            const data = await res.json();
            return data.post;
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['posts']});
        }
    });



    // Mutation post to delete a post
    const deletePostMutation = useMutation({
        mutationFn: async({id}: {id: string})=>{
            const res = await fetch(`/api/posts/${id}`,{
                method: "DELETE",
            });

            if(!res.ok){
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to delete the post");
            };
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']})
        }
    });

    return {
        posts,
        isLoading,
        error,
        getPost,
        createPost: createPostMutation.mutate,
        updatePost: updatePostMutation.mutate,
        deletePost: deletePostMutation.mutate,
        refreshPosts: refetch
    }

}

