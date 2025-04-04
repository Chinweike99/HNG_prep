// import PostCard from "@/components/PostCard";
// import { ProtectedRoute } from "@/components/ProtectedRoute";
// import { query } from "@/lib/db/connection";


// export default async function AdminPostPage({
//     params,
//     searchParams,
// }: {
//     params: {userId: string};
//     searchParams: {[key: string]: string | string[] | undefined};
// }){
//     return (
//         <ProtectedRoute userId={params.userId} requiredRole='admin'>
//             <AdminPostsContent userId={params.userId}/>
//         </ProtectedRoute>
//     );
// }


// async function AdminPostsContent({ userId }: { userId: string }) {
//     const result = await query('SELECT * FROM posts');
//     const posts = result.rows;
  
//     return (
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Admin Posts Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {posts.map((post) => (
//             <PostCard 
//               key={post.id} 
//               post={post} 
//               showAnalysis={true} 
//               canEdit={true} 
//               canDelete={true} 
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }


import { useAuth } from '@/components/AuthProvider';
import CreatePostForm from '@/components/CreatePostForm';
// import CreatePostForm from '@/components/CreatePostForm';

export default function AdminCreatePost() {
  const { user } = useAuth();
  
  if (!user || user.role !== 'admin') {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <CreatePostForm />
    </div>
  );
}