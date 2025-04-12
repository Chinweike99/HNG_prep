"use client";

import { queryClient } from "@/app/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";



interface ProviderProps {
    children: ReactNode
}

export function QueryProvider({children}: ProviderProps){
    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}