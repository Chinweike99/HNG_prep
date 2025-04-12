import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";




export async function GET(){
    try {
        const userData = await getCurrentUser();
        if (!userData) {
            return NextResponse.json(
              { error: 'Not authenticated' },
              { status: 401 }
            );
          }
          
          // Check if user is admin
          if (userData.role !== 'ADMIN') {
            return NextResponse.json(
              { error: 'Not authorized' },
              { status: 403 }
            );
          }

          // Get all posts (including unpublished);
          const posts = await prisma.post.findMany({
            include: {
                author: {
                    select:{
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {createdAt: "desc"},
          })

          return NextResponse.json({posts})
    } catch (error) {
      console.error('Get admin posts error:', error);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }
}




