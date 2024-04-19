import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

// export async function GET(request: NextRequest) {
//     const searchParams = request.nextUrl.searchParams;
//     const search = searchParams.get('search') || '';
//     const status = searchParams.get('status');
//     const sort = searchParams.get('sort') || 'name';

//     let whereCondition = status ? {
//         status: [status.toUpperCase()], // นำ enum มาใช้
//         name: {
//             contains: search,
//             mode: 'insensitive'
//         },
//     } : {
//         name: {
//             contains: search,
//             mode: 'insensitive'
//         },
//     };
//     try {
//         const posts = await prisma.table.findMany({
//             where: whereCondition as any,
//             orderBy: {
//                 name: sort === 'name' ? 'asc' : 'desc',
//             } as any,
//         });
//         return Response.json(posts);
//     } catch (error) {
//         return new Response(error as BodyInit, {
//             status: 500,
//         });
//     }
// }

export async function GET() {
    const posts = await prisma.table.findMany();
    return Response.json(posts);
}




export async function POST(request: Request) {

    try {
        const { name, capacity, statusID } = await request.json()
        try {
            const { name, capacity, status } = await request.json(); // เปลี่ยนจาก statusID เป็น status
                (Add new files and update imports)
            const newPost = await prisma.table.create({
                data: {
                    name,

                    capacity,
                    statusID: Number(statusID),

                }
            })
            return Response.json(newPost)
        } catch (error) {
            return new Response(error as BodyInit, {
                capacity,
                status: status.toUpperCase(), // นำ enum มาใช้
            }
        });
        return Response.json(newPost);
    } catch (error) {
        return new Response(error as BodyInit, {
            (Add new files and update imports)
            status: 500,
        });
}
}
