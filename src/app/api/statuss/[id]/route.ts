import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const statusId = Number(params.id)
    const statusWithPosts = await prisma..findUnique({
      where: { id: statusId },
      include: {
        posts: true, // Include related posts in the response
      },
    })
    return Response.json(statusWithPosts)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name } = await req.json()
    const status = await prisma.status.update({
      where: { id: Number(params.id) },
      data: { name },
    })
    return Response.json(status)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    return Response.json(
      await prisma.status.delete({
        where: { id: Number(params.id) },
      })
    )
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}