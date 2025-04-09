// Creat Admin Users Endpoint

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){
    try {
        const userData = await getCurrentUser(req);
        if (!userData){
            return NextResponse.json(
                {error: "User Not Authenticated"},
                {status: 401}
            )
        }

        // Check if user is admin
        if(userData.role !== "ADMIN"){
            return NextResponse.json(
                {error: "Not Authorized"},
                { status: 403}
            )
        };

        // Get all users
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                _count: {
                    select: {
                        posts: true
                    }
                }
            }, 
            orderBy: {createdAt: "desc"},
        })

        return NextResponse.json({users});
    } catch (error) {
        console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
    }
}



