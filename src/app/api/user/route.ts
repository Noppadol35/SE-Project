import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

// GET all user
export async function GET() {
    try {
        const user = await prisma.user.findMany();
        return Response.json(user);
    } catch (error) {
        console.error('Error fetching tables:', error);
        return new Response(error as BodyInit, { status: 500 });
    }
}