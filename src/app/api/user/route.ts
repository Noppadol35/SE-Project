import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    const accessToken = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })
    return Response.json({
        message: 'message',
        accessToken
    })
}