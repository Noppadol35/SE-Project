import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'
import { authOptions } from '../[...nextauth]/route'

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    try {
        const session = await getServerSession(authOptions, request, response);
        const accessToken = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        })

        return response.status(200).json({
            message: 'message',
            accessToken,
            session
        })
    } catch (error) {
        console.error("An unexpected error happened:", error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
