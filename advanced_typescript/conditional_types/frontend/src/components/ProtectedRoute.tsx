"use client";

// import { getUserById } from "@/lib/db/connection";
// import { UserRole } from "@/lib/types/roles";
// import { redirect } from "next/navigation";
// import { ReactNode } from "react";


// type ProtectedProps<T extends UserRole> = {
//     children: ReactNode;
//     userId: string;
//     requiredRole: T;
//     fallback?: string;
// };

// export async function ProtectedRoute<T extends UserRole>({
//     children,
//     userId,
//     requiredRole,
//     fallback= '/'
// }: ProtectedProps<T>){
//     const user = await getUserById(userId);
//     if(!user || user.role !== requiredRole){
//         redirect(fallback)
//     }
//     return <>{children}</>
// }



import { useAuth } from './AuthProvider';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole: 'admin' | 'editor' | 'viewer';
}) {
  const { user } = useAuth();

  if (!user || user.role !== requiredRole) {
    redirect('/login');
  }

  return <>{children}</>;
}