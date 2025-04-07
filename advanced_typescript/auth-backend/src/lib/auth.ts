
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { } from 'crypto';
import { compare, hash  } from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv'
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
dotenv.config();



export const regiistrationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email('invalid email address'),
    password: z.string().min(8, "Password must be more than 8 characters")
});


export const loginSchema = z.object({
    email: z.string().email("Mail not recognized"),
    password: z.string().min(8, "password is required"),
});

export type RegisterInput = z.infer<typeof regiistrationSchema>;
export type LogingInput = z.infer<typeof loginSchema>;


// Password Utilities
// export async function hashPassword(password: string): Promise<string> {
    // return hash(password, 12)
// }

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


export async function verifyPassword (
    password: string,
    hashPassword: string,
) : Promise<boolean> {
    return compare(password, hashPassword)
}


// JWT utilities
export function signJwtToken(payload: any): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d' as any,
  });
}


export function  verifyJwtToken(token: string) : any {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!)
    } catch (error) {
        console.error(error)
    }
}



//Cookies utilities
export async function setAuthCookie(token: string): Promise<void> {
    (await cookies()).set('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7*24*60*60, // 7days
        path: '/',
        sameSite: 'strict'
    });
}

export async function getAuthToken(req?: NextRequest): Promise<string | null>{
    if(req){
        const token = req.cookies.get('authToken')?.value;
        return token || null
    }
    // For server components and API routes
    return (await cookies()).get('authToken')?.value || null
}


// Get current user from request
export async function getCurrentUser(req?: NextRequest) {
    const token = await getAuthToken(req);
    if(!token) return null;

    const currentUser = verifyJwtToken(token);
    if(!currentUser) return  null;

    return currentUser
}


