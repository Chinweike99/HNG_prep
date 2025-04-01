// import { Post, PostStatus } from "@/lib/services/posts";



// type PostCardProps<T extends PostStatus = PostStatus> = {
//     post: Post<T>;
//     showAnalysis?: boolean;
//     canEdit: boolean;
//     canDelete: boolean;
// } & (T extends 'published' ? {
//     showViews: boolean;
//     analytics?: { views: number; likes: number }; // Define analytics properly
// } : {});




// export default function PostCard<T extends PostStatus>(props: PostCardProps<T>) {
//     const { post, showAnalysis = false, canEdit, canDelete } = props;
    
//     return (
//       <div className="border rounded-lg p-4 shadow-sm">
//         <h2 className="text-xl font-semibold">{post.title}</h2>
//         <p className="text-gray-600 mt-2">{post.content.substring(0, 100)}...</p>
        
//         <div className="mt-4 flex justify-between items-center">
//           <span className="text-sm text-gray-500">
//             Status: {post.status}
//           </span>
          
//           {post.status === 'published' && (
//             <span className="text-sm text-gray-500">
//               Views: {(props as PostCardProps<'published'>).showViews ? post.views : 'N/A'}
//             </span>
//           )}
//         </div>
        
//         {showAnalysis    && 'analytics' in props && (
//           <div className="mt-2 text-sm">
//             <p>Total views: {props.analytics.views}</p>
//             <p>Total likes: {props.analytics.likes}</p>
//           </div>
//         )}
        
//         <div className="mt-4 flex space-x-2">
//           {canEdit && (
//             <button className="px-3 py-1 bg-blue-500 text-white rounded">
//               Edit
//             </button>
//           )}
//           {canDelete && (
//             <button className="px-3 py-1 bg-red-500 text-white rounded">
//               Delete
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }




import { Post, PostStatus } from "@/lib/services/posts";

type AnalyticsData = {
  views: number;
  likes: number;
};

type PostCardProps<T extends PostStatus = PostStatus> = {
  post: Post<T>;
  showAnalysis?: boolean;
  canEdit: boolean;
  canDelete: boolean;
  analytics?: AnalyticsData;
} & (T extends 'published' ? { showViews: boolean; } : {});

export default function PostCard<T extends PostStatus>(props: PostCardProps<T>) {
  const { post, showAnalysis = false, canEdit, canDelete, analytics } = props;
  
  // Type guard function to check if props has showViews property
  const hasShowViews = (obj: PostCardProps<T>): obj is PostCardProps<T> & { showViews: boolean } => {
    return post.status === 'published' && 'showViews' in obj;
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-600 mt-2">{post.content.substring(0, 100)}...</p>
      
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Status: {post.status}
        </span>
        
        {post.status === 'published' && (
          <span className="text-sm text-gray-500">
            Views: {hasShowViews(props) && props.showViews ? post.views : 'N/A'}
          </span>
        )}
      </div>
      
      {showAnalysis && analytics && (
        <div className="mt-2 text-sm">
          <p>Total views: {analytics.views}</p>
          <p>Total likes: {analytics.likes}</p>
        </div>
      )}
      
      <div className="mt-4 flex space-x-2">
        {canEdit && (
          <button className="px-3 py-1 bg-blue-500 text-white rounded">
            Edit
          </button>
        )}
        
        {canDelete && (
          <button className="px-3 py-1 bg-red-500 text-white rounded">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}