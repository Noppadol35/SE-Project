import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return Response.json(categories)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json()
    const newCategory = await prisma.category.create({
      data: {
        name
      },
    })
    return Response.json(newCategory)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}