import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id);
  try {
    const post = await prisma.table.findUnique({
      where: { id: params.id },
      include: {
        status: true,
      },
    });
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, capacity, statusID } = await req.json();
    const postId = Number(params.id);
    const updatePost = await prisma.table.update({
      where: { id: params.id },
      data: {
        name: name,
        capacity: Number(capacity),
        statusID: Number(statusID),
      },
    });
    return new Response(JSON.stringify(updatePost), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = Number(params.id);
    const deletedPost = await prisma.table.delete({
      where: { id: params.id },
    });
    return new Response(JSON.stringify(deletedPost), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}