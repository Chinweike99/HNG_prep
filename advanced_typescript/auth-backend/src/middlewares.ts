import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./lib/auth";


//Paths that require authentication
const protectedPaths = ['/dashboard', '/profile', '/admin'];

// Paths that require admin role
const adminPaths = ['/admin']

//Public paths
const publicPaths = ['/login', '/register'];

export async function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;
    console.log("Path:", path);

    //Check if path requires protection
    const isProtectedPath = protectedPaths.some(pp => path.startsWith(pp));
    const isAdminPath = adminPaths.some(ap=>path.startsWith(ap));
    const isPublicPath = publicPaths.some(pp=>path.startsWith(pp));

    // Get current user
    const userData = await getCurrentUser(request);
    const isAuthenticated = !!userData;
    const isAdmin = userData?.role === "ADMIN";
    console.log("User data:", userData);
    
    //Redirect if needed
    if(isProtectedPath && !isAuthenticated){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if(isAdminPath && !isAdmin){
        return NextResponse.redirect(new URL('/', request.url));
    }
    if(isPublicPath && isAuthenticated){
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();

}


export const config = {
    matcher: [
        /**
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image(image optimization files)
         * - favicon.ico(favicon files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico.*))',
    ],
};




