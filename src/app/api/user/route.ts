import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

// Update user
export async function PUT(
    req: Request,
    { params, body }: { params: { id: string }; body: { name: string; email: string; phone: string; role: Role } },
) {
    try {
        const res = await prisma.user.update({
            where: { id: params.id },
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                role: body.role,
            },
        });
        return Response.json(res);
    } catch (error) {
        console.log(error);
        
    }
}

// Delete user
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } },
) {
    try {
        const userId = String(params.id);
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });
        return Response.json(deletedUser);
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        });
    }
}

// Get all users
export async function GET() {
    try {
        const allUsers = await prisma.user.findMany();
        return Response.json(allUsers);
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        });
    }
}

//get user by id

