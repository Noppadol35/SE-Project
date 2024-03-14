import { Menu, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export type Cart = {
    id: string;
    quantity: number;
    tableID: string;
    menu: Menu;
}

export async function GET() {
    //const body = await prisma.order.findMany()
    const users = await prisma.order.findMany({
        include: {
            menu: true,
        },
    })
    return Response.json(users as Cart[])
}


// edit quantity in cart

export async function PUT(id: string, data: { quantity: number }) {

    const updatedCart = await prisma.order.update({
        where: { id },
        data: {
            ...data
        },
    })
    return Response.json(updatedCart)
}

// delete cart

export async function DELETE(id: string) {
    try {
        const deletedCart = await prisma.order.delete({
            where: { id:"" },
        });
        return deletedCart;
    } catch (error) {
        throw new Error(`Error deleting cart: ${error}`);
    }
}
