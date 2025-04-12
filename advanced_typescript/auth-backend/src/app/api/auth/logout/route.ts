import { clearAuthCookie } from "@/lib/auth";
import { NextResponse } from "next/server";




export async function POST() {
    try {
        clearAuthCookie();

        return NextResponse.json(
            {message: "Logged out successfully"}
        );
    } catch (error) {
        console.error("Logout error: ", error);
        return NextResponse.json(
            {error: "Something went wrong on loffing out "},
            { status: 500}
        )
    }
}



