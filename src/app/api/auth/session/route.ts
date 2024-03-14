import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'
import { authOptions } from '@/app/auth';
import { NextResponse } from 'next/server';

export async function GET(request: NextApiRequest) {
    try {
        const session = await getServerSession();
        const accessToken = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        })

        return NextResponse.json({
            message: 'message',
            accessToken,
            session
        })
    } catch (error) {
        console.error("An unexpected error happened:", error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
