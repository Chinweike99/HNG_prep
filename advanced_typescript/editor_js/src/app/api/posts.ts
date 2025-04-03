import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();
export default async function handler(req: NextRequest, res: NextResponse) {
    if (req.method === "POST") {
        try {
            const { title, content } = await req.json();
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    publishedAt: new Date(),
                }
            })
            return NextResponse.json(post,{status: 201})
        } catch (error) {
            console.error('Error', error);
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }else if(req.method === 'GET'){
        try {
            const posts = await prisma.post.findMany({
                orderBy: {
                    publishedAt:'desc'
                }
            }) 
            return NextResponse.json(posts, { status: 200 });
        } catch (error) {
            console.error('Error fetching posts:', error);
            return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
          }
        } 
        // else {
        //     return NextResponse.json('Allow', ['GET', 'POST'])
        //   res.setHeader('Allow', ['GET', 'POST']);
        //   res.status(405).end(`Method ${req.method} Not Allowed`);
        // }

}
