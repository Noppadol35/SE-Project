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
    const order = await prisma.order.findMany({
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
    return Response.json(order)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { quantity, status } = await req.json();
    const orderId = Number(params.id);
    const updateorder = await prisma.order.update({
      where: { id: orderId },
      data: { 
        quantity,
        status,
      },
    });
    return { json: updateorder };
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
    try {
        const orderId = Number(params.id)
        const deleteorder = await prisma.order.delete({
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