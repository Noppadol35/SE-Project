import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const statuss = await prisma.status.findMany()
    return Response.json(statuss)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json()
    const newstatuss = await prisma.status.create({
      data: {
        name
      },
    })
    return Response.json(newstatuss)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}