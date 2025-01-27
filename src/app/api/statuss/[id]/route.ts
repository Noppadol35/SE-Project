import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const statusID = Number(params.id)
    const statusWithPosts = await prisma.status.findUnique({
      where: { id: statusID },
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