// 'use client';

// import { useState } from 'react';
// import Breadcrumb from './Breadcrum';
// import Sidebar from './Sidebar';




// const Page = () => {
//     const [currentPath, setCurrentPath] = useState("/dashboard");
  
//     return (
//       <div className="flex h-screen">
        
//         <Sidebar onNavigate={setCurrentPath} />
//         <div className="flex-1 p-6">
//           <Breadcrumb />
//           <div className="mt-4 p-4 bg-white shadow rounded-lg">
//             <h1 className="text-xl font-bold">{currentPath}</h1>
            
//           </div>
//           Hell0
//         </div>
//       </div>
//     );
//   };
  
//   export default Page;


"use client";

import Breadcrumb from "./Breadcrum";
import Sidebar from "./Sidebar";

const Page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Breadcrumb />
        <div className="mt-4 p-4 bg-white shadow rounded-lg">
          {/* Content will be dynamically rendered based on the route */}
          Hell0
        </div>
      </div>
    </div>
  );
};

export default Page;