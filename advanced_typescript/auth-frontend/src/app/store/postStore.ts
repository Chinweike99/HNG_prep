import { create } from "zustand";

export interface Post {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    author: {
        id: string;
        name: string | null;
        email: string;
    };
};


interface PostState {
    posts: Post[];
    currentPost: Post | null;
    isLoading: boolean;
    error:string | null;
    setPosts: (posts: Post[]) => void;
    setCurrentPost: (post: Post | null) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
};


export const usePostStore = create<PostState>((set) => ({
    posts: [],
    currentPost: null,
    isLoading: false,
    error: null,
    setPosts: (posts) => set({posts}),
    setCurrentPost: (post) => set({currentPost: post}),
    setLoading: (isLoading) => set({isLoading}),
    setError: (error) => set({error})
}))



