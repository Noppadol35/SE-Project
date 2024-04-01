import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const cart = await prisma.cart.findMany()
    return Response.json(cart)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const { menuID, quantity, tableID } = await req.json()

    // Log the received data for debugging purposes
    console.log('Received data:', { menuID, quantity, tableID })

    const newcart = await prisma.cart.create({
      data: {
        menuID: Number(menuID),
        quantity: Number(quantity),
        tableID,
      },
    })

    return Response.json(newcart)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}