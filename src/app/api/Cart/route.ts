import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const ordersWithMenu = await prisma.cart.findMany({
        include: {
            menu: {
                select: {
                    name: true,
                    price: true
                }
            },
            order: {
                select: {
                    quantity: true
                }
            }
        }
    })
    return Response.json(ordersWithMenu)
}

// delete item in cart

export async function DELETE(id: string) {
    const deleteCart = await prisma.cart.delete({
        where: {
            id: id
        }
    })
    return Response.json(deleteCart)
}