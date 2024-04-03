import { type NextRequest } from 'next/server'  
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'desc'
  const menu = searchParams.get('menu')

  try {
      const order = await prisma.order.findMany({
          where: {
            tableID: {
              contains: search,
              mode: 'insensitive'
          },
          
      },
      orderBy: {
        createdAt: sort === 'DateTime' ? 'desc' : 'asc',
      },
          include: {
            menu: true,
    }
  })

    return Response.json(order)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
    try {
      const orderData = await req.json()
      const newOrders = await Promise.all(
        orderData.map(async (data: any) => {
          const { menuID, quantity, tableID, cartID,status } = data
          return await prisma.order.create({
            data: {
              menuID: Number(menuID),
              quantity: Number(quantity),
              tableID,
              cartID: Number(cartID),
              status,
            },
          })
        })
      )
  
      // ส่งข้อมูลคำสั่งที่สร้างขึ้นให้กับผู้ใช้
      return new Response(JSON.stringify(newOrders), { status: 201 });
    } catch (error) {
      // ส่งคำตอบกลับให้ผู้ใช้เมื่อมีข้อผิดพลาดเกิดขึ้น
      return new Response(error as BodyInit, { 
        status: 500,
    })
    }
  }