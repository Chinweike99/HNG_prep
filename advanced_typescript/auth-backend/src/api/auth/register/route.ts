import { regiistrationSchema } from "@/lib/auth";
import { NextResponse } from "next/server";



export async function POST(req: Request){
    try {
        const body = await req.json();

        const validateResult = regiistrationSchema.safeParse(body);
        if(!validateResult){
            return NextResponse.json(
                {error: validateResult.error.errors[0].message},
                {status: 400}
            )
        }
    } catch (error) {
        
    }
}


