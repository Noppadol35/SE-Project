import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all history

export async function GET() {
    try {
        const history = await prisma.bill.findMany({
            include: {
                table: true,
                guest: true,
            }
        });
        return Response.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        return new Response(error as BodyInit, { status: 500 });
    }
}