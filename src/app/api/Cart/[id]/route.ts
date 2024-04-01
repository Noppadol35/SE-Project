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
    const tableID = String(params.id)
    const sort = searchParams.get('sort') || 'status'
    const cart = await prisma.cart.findMany({
      where: { 
        
        tableID: tableID
      },
      include: {
        table: true,
        menu: true, 
      }, orderBy: {
        status: sort === 'status' ? 'desc' : 'asc',      
    } as any,
    })
    return Response.json(cart)
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
    const { quantity,status } = await req.json()
    // const { name } = await req.json()
    const cartId = Number(params.id)
    const updatecart = await prisma.cart.update({

      where: { id: cartId },
      data: { 
        quantity,
        status,
    },

    })
    return Response.json(updatecart)
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
        const cartId = Number(params.id)
        const deletecart = await prisma.cart.delete({
            where: { 
                id: cartId
            },
        })

        return new Response(JSON.stringify(deletecart))
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}