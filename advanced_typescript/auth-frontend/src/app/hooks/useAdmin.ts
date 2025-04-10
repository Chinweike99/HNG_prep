import { useQuery } from "@tanstack/react-query";
import { User } from "../store/authStore";
import { Post } from "../store/postStore";



// Interface hook for admin operations
interface AdminUser extends User {
    _count: {
        posts: number;
    };
    createdAt: string;
}


// cutom hook for admin operations
export function useAdmin(){
    const{
        data: users,
        isLoading: isLoadingUsers,
        error: usersError,
        refetch: refetchUsers,
    } = useQuery<AdminUser[]>({
        queryKey: ['admin', 'users'],
        queryFn: async()=> {
            const res = await fetch('/api/admin/users');
            if(!res.ok){
                throw new Error('Failed to fetch users')
            }
            const data = await res.json();
            return data.users;
        },
        enabled: false, // Don't auto fetch, we'll call manually when needed
    })



// Query to fetch all posts including unpubished (admin only)
    const {
        data: allposts,
        isLoading: isLoadingAllPosts,
        error: allpostsError,
        refetch: refetchAllPosts
    } = useQuery<Post[]>({
        queryKey: ['admin', 'posts'],
        queryFn: async () => {
            const res = await fetch('/api/admin/posts');
            if(!res.ok){
                throw new Error('Unable to fetch all the posts');
            }
            const data = await res.json();
            return data.posts()
        },
        enabled: false,
    })


    return {
        users,
        isLoadingUsers,
        usersError,
        loadUsers: refetchUsers,


        allposts,
        isLoadingAllPosts,
        allpostsError,
        loadAllPosts: refetchAllPosts,
    }



}



