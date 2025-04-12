'use client';

import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";



export default function AdminLayout({children}:{children: React.ReactNode}){
    const {isAdmin, isLoading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!isLoading && !isAdmin){
            router.push('/');
        }
    }, [isLoading, isAdmin, router]);

    if(isLoading){
        <div className="flex min-h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }

    if(!isAdmin){
        return null;
    }

    return (
        <div>
          <div className="bg-white shadow-md mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="mt-4 flex space-x-4">
                  <Link 
                    href="/admin" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Overview
                  </Link>
                  <Link 
                    href="/admin/users" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                  <Link 
                    href="/admin/posts" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Posts
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      );

}




