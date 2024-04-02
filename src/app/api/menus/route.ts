import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all menu
export async function GET() {
    try {
        const menus = await prisma.menu.findMany();
        return Response.json(menus);
    } catch (error) {
        console.error('Error fetching menus:', error);
        return new Response(error as BodyInit, { status: 500 });
    }
}

//create new menu

export async function POST(request: Request) {
    const body = await request.json();
    try {
        const newMenu = await prisma.menu.create({
            data: {
                name: body.name,
                price: body.price,
                category: body.category,
            },
        });
        return Response.json(newMenu);

    } catch (error) {
        console.error('Error creating menu:', error);
        return new Response(error as BodyInit, { status: 500 });
    }
}