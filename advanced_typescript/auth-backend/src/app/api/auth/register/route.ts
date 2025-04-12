import { hashPassword, regiistrationSchema, setAuthCookie, signJwtToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try {
        const body = await req.json();
        const validateResult = regiistrationSchema.safeParse(body);
        if(!validateResult.success){
            return NextResponse.json(
                {error: validateResult.error.errors[0].message},
                {status: 400}
            )
        }
        const { name, email, password} = validateResult.data;

        const existingUser = await prisma.user.findUnique({
            where: {email},
        })
        if(existingUser){
            return NextResponse.json(
                {error: "User already exists try loging in "},
                { status: 400 },
            )
        }

        const hashedPassword = await hashPassword(password);
        //Create user
        const user = await prisma.user.create({
            data: {
                name, email, password: hashedPassword
            }
        });

        //Create JWT token
        const token = signJwtToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        //Set cookie
        setAuthCookie(token);
        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });


    } catch (error) {
        console.error('Registration error: ', error);
        return NextResponse.json(
            {error: "Something went wrong. Please try again."},
            {status: 500}
        )
    }
}


