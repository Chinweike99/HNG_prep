import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";





export default function protectectedLayout({children,}: {children: React.ReactNode}){
    const {user, isAuthenticated, isLoading, logout, isAdmin} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!isLoading && !isAuthenticated){
            router.push('/login')
        }
    }, [isLoading, isAuthenticated, router]);

    if(isLoading){
        return (
            <div className="flex min-h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
        );
    }

    if(!isAuthenticated){
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                      Auth Project
                    </Link>
                  </div>
                  <div className="ml-10 flex items-center space-x-4">
                    <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
                      Home
                    </Link>
                    <Link href="/posts" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
                      Posts
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
                        Admin Dashboard
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="px-3 py-1 text-sm text-gray-600">
                      {user?.name ? user.name : user?.email}
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                        {user?.role}
                      </span>
                    </span>
                    <button
                      onClick={() => logout()}
                      className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <main className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      );


}



