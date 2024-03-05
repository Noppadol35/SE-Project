'use server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
    try {
        const { name, password, email, phone } = await request.json()
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await prisma.user.create({
            data:
            {
                name,
                password: hashedPassword,
                email,
                phone
            },
        })
        return Response.json({ message: 'User created', newUser });
    }  catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.[0] === 'email') {
            return Response.json({ error: 'Email is already taken' }, { status: 400 });
        }
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}