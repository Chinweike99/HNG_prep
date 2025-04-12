import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){
    try {
        const userData = await getCurrentUser(req);
        if(!userData){
            return NextResponse.json(
                {error: "NOT AUTHENTICATED"},
                {status: 401}
            )
        }
 
        // Get fresh user Data
        const user = await prisma.user.findUnique({
            where: {id: userData.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        if(!user){
            return NextResponse.json(
                {error: "User not found"},
                {status: 404}
            )
        }
        return NextResponse.json({user})

    } catch (error) {
        console.error("Get user error: ", error);
        return NextResponse.json(
            {error: "Failed to get user"},
            {status: 500}
        )
    }
}



