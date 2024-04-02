import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//update menu by id

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { name, price, category } = await req.json();
        const updatedMenu = await prisma.menu.update({
            where: { id: Number(params.id) }, // แปลง params.id เป็น Int
            data: {
                name: name,
                price: price,
                category: category,
            }
        });
        return Response.json(updatedMenu);
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 });
    }
}

//delete menu by id

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const deletedMenu = await prisma.menu.delete({
            where: { id: Number(params.id) },
        });
        return Response.json(deletedMenu);
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 });
    }
}