// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";



// const Sidebar = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Elections", path: "/elections" },
//     { name: "Settings", path: "/settings" },
//   ];

//   return (
//     <div className="w-64 bg-gray-800 text-white h-screen p-4">
//       <h2 className="text-xl font-bold mb-4">Menu</h2>
//       <ul>
//         {menuItems.map((item) => (
//           <li key={item.path} className="mb-2">
//             <button
//               onClick={() => onNavigate(item.path)}
//               className="w-full text-left p-2 hover:bg-gray-700 rounded"
//             >
//               {item.name}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


// // const Sidebar = () => {
// //   const menuItems = [
// //     { name: "Dashboard", path: "/dashboard" },
// //     { name: "Elections", path: "/elections" },
// //     { name: "Settings", path: "/settings" },
// //   ];

// //   const router = useRouter();

// //   return (
// //     <div className="w-64 bg-gray-800 text-white h-screen p-4">
// //       <h2 className="text-xl font-bold mb-4">Menu</h2>
// //       <ul>
// //         {menuItems.map((item) => (
// //           <li key={item.path} className="mb-2">
// //             <button
// //               onClick={() => router.push(item.path)}
// //               className="w-full text-left p-2 hover:bg-gray-700 rounded"
// //             >
// //               {item.name}
// //             </button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// export default Sidebar;


 "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const Sidebar = () => {
//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Elections", path: "/elections" },
//     { name: "Settings", path: "/settings" },
//   ];

//   const pathname = usePathname();

//   return (
//     <div className="w-64 bg-gray-800 text-white h-screen p-4">
//       <h2 className="text-xl font-bold mb-4">Menu</h2>
//       <ul>
//         {menuItems.map((item) => (
//           <li key={item.path} className="mb-2">
//             <Link
//               href={item.path}
//               className={`w-full block p-2 hover:bg-gray-700 rounded ${
//                 pathname.startsWith(item.path) ? "bg-gray-700" : ""
//               }`}
//             >
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


"use client"; // Mark as a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Elections", path: "/elections" },
    { name: "Settings", path: "/settings" },
  ];

  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link
              href={item.path}
              className={`w-full block p-2 hover:bg-gray-700 rounded ${
                pathname.startsWith(item.path) ? "bg-gray-700" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;