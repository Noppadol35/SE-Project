import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const billID = Number(params.id)
    const statusWithPosts = await prisma.bill.findFirst({
      where: { id : billID },
      include: {
        table: true, // Include related posts in the response
      },
    })
    return Response.json(statusWithPosts)
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
      await prisma.bill.delete({
        where: { id: Number(params.id) },
      })
    )
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}