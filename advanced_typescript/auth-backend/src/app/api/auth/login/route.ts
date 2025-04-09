import { loginSchema, setAuthCookie, signJwtToken, verifyPassword } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";




export async function POST(req: Request){
    try {
        const body = await req.json();
        console.log("Login payload:", body);
        const validateResult = loginSchema.safeParse(body);
        if(!validateResult.success){
            console.error(validateResult.error.format()); 
            return NextResponse.json(
                {error: validateResult.error.errors[0].message },
                {status: 400}
            )
        }

        const {email, password} = validateResult.data;
        const user = await prisma.user.findUnique({where: {email},});

        if(!user) return NextResponse.json({error: "Invalid email or password"}, {status: 401});

        // verify password
        const isVerifyPassword = await verifyPassword(password, user.password);
        if(!isVerifyPassword){
            return NextResponse.json(
                {error: "Invalid email or password"},
                {status: 401}
            )
        }

        

        // Create JWT Token
        const token = signJwtToken({
            id: user.id,
            email: user.email,
            password: user.password,
            role: user.role
        })

        // Store in cookie (Set Cookie)
        setAuthCookie(token);

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        })


    } catch (error) {
        console.error("Login error: ", error);
        return NextResponse.json(
            {error: "Something went wrong. Please try again"},
            {status: 500}
        )
    }
}



