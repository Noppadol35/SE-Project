import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all tables
export async function GET() {
    try {
        const allTables = await prisma.table.findMany();
        return Response.json(allTables);
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    try {
        const newTable = await prisma.table.create({
            data: {
                name: body.name,
                capacity: body.capacity,

            },
        });
        return Response.json(newTable);

    } catch (error) {
        console.error('Error creating table:', error);
        return new Response(error as BodyInit, { status: 500 });
    }
}