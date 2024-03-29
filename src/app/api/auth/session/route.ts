import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const session = await getServerSession();

        return NextResponse.json({
            message: 'message',
            session
        })
    } catch (error) {
        console.error("An unexpected error happened:", error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
