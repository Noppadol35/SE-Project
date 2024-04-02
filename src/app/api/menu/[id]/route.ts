import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const postId = Number(params.id)
  const post = await prisma.menu.findUnique({
    where: {
      id: postId
    },
    include: {
      category: true,
    }
  })

  return Response.json(post)
}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { name, categoryID } = await req.json()
    const postId = Number(params.id)
    const updatePost = await prisma.menu.update({

      where: { id: postId },
      data: {

        name,
        categoryID: Number(categoryID),
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
    const postId = Number(params.id)
    const deletedPost = await prisma.menu.delete({
      where: { id: postId },
    })
    return Response.json(deletedPost)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}