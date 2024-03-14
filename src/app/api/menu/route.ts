import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type Menu = {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
}

export async function GET() {
    const body = await prisma.menu.findMany()
    return Response.json(body as Menu[])
}