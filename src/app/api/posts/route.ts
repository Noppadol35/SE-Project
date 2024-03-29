import { type NextRequest } from 'next/server'  
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status')
    const sort = searchParams.get('sort') || 'name'
    
    let whereCondition = status? {
        status,
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

    const posts = await prisma.table.findMany(
        {
            where: whereCondition as any,
            orderBy: {
                name: sort === 'name' ? 'asc' : 'desc',      
            } as any,
            include: {
                status: true,
        }
    })
    return Response.json(posts)

}


export async function POST(request: Request) {
    try{
        const { name,capacity,statusId } = await request.json()
        const newPost = await prisma.table.create({
            
            data: {
                
                name,
                capacity,          
                statusId: String(statusId),
                
            }
        })
        return Response.json(newPost)

    }catch (error) {
        return new Response(error as BodyInit, { 
            status: 500,
        })
    }
    
}

