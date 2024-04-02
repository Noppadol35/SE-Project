import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get table by id
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const table = await prisma.table.findUnique({
            where: { id: params.id },
        });
        return Response.json(table);
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 });
    }
}

// update table by id

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { name, capacity, status } = await req.json();
        const updatedTable = await prisma.table.update({
            where: { id: params.id },
            data: { name, capacity, status },
        });
        return Response.json(updatedTable);
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 });
    }
}

// delete table by id

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const deletedTable = await prisma.table.delete({
            where: { id: params.id },
        });
        return Response.json(deletedTable);
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 });
    }
}