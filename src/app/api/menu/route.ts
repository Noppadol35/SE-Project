import { type NextRequest } from 'next/server'
import { PrismaClient } from "@prisma/client";  


const prisma = new PrismaClient()



export async function GET(request: NextRequest) {

        const searchParams = request.nextUrl.searchParams
        const search = searchParams.get('search')|| ''
        const category = searchParams.get('category')
        const sort = searchParams.get('sort') || 'asc'

        let whereCondition = category ? {

            category: {
                is: {
                    name: category
                
                }
            },
            name: {
                contains: search,
                mode: 'insensitive'
            },
        } : {      
            name: {
                contains: search,
                mode: 'insensitive'
            },
        }

        const menu = await prisma.menu.findMany({

            where: whereCondition as any,
                orderBy: {
                    id: sort,
                } as any,
                include: {
                    category: true
                }
            })
        return Response.json(menu)
   
}


export async function POST(request: Request) {
    try{
        const { name, price,categoryID } = await request.json()
        const newMenu = await prisma.menu.create({
            data: {
                name,
                price,
                categoryID: Number(categoryID),
            }
        })
        return Response.json(newMenu)
    }catch (error) {
        return new Response(error as BodyInit, { 
            status: 500,
        })
    }
}