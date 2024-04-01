import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { table } from 'console'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    
    const searchParams = request.nextUrl.searchParams
    const orderID = Number(params.id)
    const sort = searchParams.get('sort') || 'menuID'
    const order = await prisma.orderR.findUnique({
      where: { 
        
        id: orderID

      },
     
    })
    return Response.json(order)
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
    const { quantity } = await req.json()
    // const { name } = await req.json()
    const orderId = Number(params.id)
    const updateorder = await prisma.orderR.update({

      where: { id: orderId },
      data: { 
        quantity,
    },

    })
    return Response.json(updateorder)
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
        const orderId = Number(params.id)
        const deleteorder = await prisma.orderR.delete({
            where: { 
                id: orderId
            },
        })

        return new Response(JSON.stringify(deleteorder))
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}