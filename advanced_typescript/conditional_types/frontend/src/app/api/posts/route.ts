
import { getUserById } from "@/lib/db/connection";
import { createPost, getPostForUser } from "@/lib/services/posts";
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest) {
    const postId = request.nextUrl.searchParams.get('id');
    const userId = request.headers.get('x-user-id');

    if(!postId || !userId){
        return NextResponse.json({error: "Missing Parameters"}, {status: 400});
    };

    const user = await getUserById(userId);
    if(!user){
        return NextResponse.json({error: "User not found"}, {status: 404});
    }

    try {
        const postResponse = await getPostForUser(user, postId);
        return NextResponse.json(postResponse)
    } catch (error) {
        
    }
}


export async function POST(request: NextRequest){
    const userId = request.headers.get('x-user-id');
    if(!userId) {
        return NextResponse.json({error: "Unauthorised"},  {status: 401});
    }

    const body = await request.json();
    const user = await getUserById(userId);
    if(!user){
        return NextResponse.json({error: "User does not exist"},  {status: 404});
    }
    
    try {
        const post = await createPost(user, body);
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({error: 'Failed to create post'}, {status: 500});
    }
}



