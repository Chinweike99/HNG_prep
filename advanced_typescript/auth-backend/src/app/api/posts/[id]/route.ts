// Endpoint to create a single post..

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {  z } from "zod";

const postUpdatedSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(3, "Content is required"),
  published: z.boolean().optional(),
});

interface Params {
  params: {
    id: string;
  };
}

// Get a single post by id
export async function GET(request: Request, { params }: Params) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Update a post
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    // To update a post, you need to check if the user is an admin
    //Get the user.
    const userData = await getCurrentUser(request);
    if (!userData) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    // Check if the post with the unique id exists.
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // check if user is an Admin or Author
    const isAuthor = post.authorId === userData.id;
    const isAdmin = userData.role === "ADMIN";

    if (!isAuthor && !isAdmin) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 403 });
    }

    const body = await request.json();
    //Validate Input
    const validateResult = postUpdatedSchema.safeParse(body);
    if (!validateResult.success) {
      return NextResponse.json(
        { error: validateResult.error.errors[0].message },
        { status: 400 }
      );
    }

    //update post
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: validateResult.data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Delete a post
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const userData = await getCurrentUser(request);

    if (!userData) {
      if (!userData) {
        return NextResponse.json(
          { error: "Not authenticated" },
          { status: 401 }
        );
      }
    }

    //Check if post exists and user is the author or admin
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if user is author or admin
    const isAuthor = post.authorId === userData.id;
    const isAdmin = userData.role === "ADMIN";

    if (!isAuthor && !isAdmin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    await prisma.post.delete({
        where: {id: params.id}
    })
    return NextResponse.json({ message: "Post deleted successfully" }); // Ensure response is returned

  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
