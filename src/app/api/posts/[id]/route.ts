import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = String(params.id)
  const post = await prisma.table.findUnique({
    where: { 
      id: postId 
    },
    include: {
      status: true,
    }
  })  

  return Response.json(post)
}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { name, capacity,statusID } = await req.json()
    const postId = String(params.id)
    const updatePost = await prisma.table.update({

      where: { id: postId },
      data: {
        name: name,
        capacity:Number(capacity),
        statusID:Number(statusID),

    }
    })
    return Response.json(updatePost)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const postId = String(params.id)
    const deletedPost = await prisma.table.delete({
      where: { id: postId },
    })
    return Response.json(deletedPost)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}