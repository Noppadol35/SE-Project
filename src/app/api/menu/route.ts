import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()



export async function GET() {
    const menuPage = await prisma.menu.findMany({
        select:{
            name: true,
            price: true
        }
    })
    return Response.json(menuPage)
}