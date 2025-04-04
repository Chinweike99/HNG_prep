"use client";


import { useAuth } from '@/components/AuthProvider';
import PostList from '@/components/PostList';
// import PostList from '@/components/PostList';

export default function ViewerPosts() {
  const { user } = useAuth();
  
  if (!user || user.role !== 'viewer') {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">View Posts</h1>
      <PostList canEdit={false} />
    </div>
  );
}