import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const quantitys = await prisma.quantity.findMany()
    return Response.json(quantitys)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const { quantity } = await req.json()
    const newquantity = await prisma.quantity.create({
      data: {
        quantity: Number(quantity),
      },
    })
    return Response.json(newquantity)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}