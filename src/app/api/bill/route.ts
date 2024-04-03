import { type NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
        const searchParams = request.nextUrl.searchParams
        const search = searchParams.get('search') || ''
        const status = searchParams.get('status')
        const sort = searchParams.get('sort') || 'createdAt' 
        
    try {
         const bill = await prisma.bill.findMany({

        orderBy: {
          createdAt: sort === 'createdAt' ? 'asc' : 'desc',      
        } as any,
        include: {
            table: true,
    }as any,
})
      console.log('Bill data:', bill); // เพิ่มบรรทัดนี้
      return Response.json(bill)
    } catch (error) {
      return new Response(error as BodyInit, {
        status: 500,
      })
    }
  }

  export async function POST(req: Request) {
    try {
      const { total, tableID ,people } = await req.json();
      
      // เพิ่ม console.log ตรงนี้
      console.log('Received data:', { total, tableID });
  
      const newBill = await prisma.bill.create({
        data: {
          total: parseFloat(total),
          tableID,
          people,
        },
      });
  
      console.log('New bill:', newBill); // เพิ่มบรรทัดนี้
  
      return Response.json(newBill);
    } catch (error) {
      console.error('Error creating new bill:', error);
      return Response.error();
    }
}