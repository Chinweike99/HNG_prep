import { rejects } from "assert";
import { NextRequest, NextResponse } from "next/server";
import Cors from 'cors'


export function initMiddleware(middleware: any){
    return (req: NextRequest, res: NextResponse) => 
        new Promise((resolve, reject) => {
            middleware(req, res, (result: any) => {
                if(result instanceof Error){
                    return reject(result);
                }
                return resolve(result)
            })
        })
}


// Initialize the cors middleware
export const cors = initMiddleware(
    Cors({
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );

