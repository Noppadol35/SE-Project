import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// get user by id
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: params.id },
        });
        return Response.json(user);
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 });
    }
}

// update user by id
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { name, email, phone, role } = await req.json();
        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: { name, email, phone, role },
        });
        return Response.json(updatedUser);
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 });
    }
}

// delete user by id

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: params.id },
        });
        return Response.json(deletedUser);
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 });
    }
}