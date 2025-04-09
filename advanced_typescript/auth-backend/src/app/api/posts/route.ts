// API Routes for posts

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


// Schema for post creation / update
const postSchema = z.object({
    title: z.string().min(3, "Title is required"),
    content: z.string().min(1, "Content is required"),
    published: z.boolean().optional(),
});

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            where: {published: true},
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {createdAt: 'desc'}
        })
        console.log(posts)
        // return NextResponse.json(posts)
        return NextResponse.json({posts})
    } catch (error) {
        console.error("Post error: ");
        return NextResponse.json(
            {error: "Error geting posts post"},
            {status: 500}
        )
    }
}



export async function POST(req: NextRequest){
    try {
        const userData = await getCurrentUser(req);

        if(!userData){
            return NextResponse.json(
                {error: "Not Authenticated"},
                {status: 401},
            )
        }

        const body = await req.json()
        const validatePostSchema = postSchema.safeParse(body);
        if(!validatePostSchema.success){
            return Response.json(
                {error: validatePostSchema.error.errors[0].message},
                {status: 400}
            )
        }
        // const {title, content, published = false} = validatePostSchema.data
        const {title, content, published} = validatePostSchema.data;
        const post = await prisma.post.create({
            data:{
                title, content, published,
                authorId: userData.id
            }, 
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })
        return NextResponse.json({post});

    } catch (error) {
        console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
    }
}





