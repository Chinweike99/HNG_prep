import { Button } from './ui/button';

export default function PostList({ canEdit }: { canEdit: boolean }) {
  // Mock data - replace with real data fetching
  const posts = [
    { id: 1, title: 'First Post', content: 'Hello world' },
    { id: 2, title: 'Second Post', content: 'Another post' },
  ];

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
          {canEdit && (
            <div className="mt-2 space-x-2">
              <Button variant="outline">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}