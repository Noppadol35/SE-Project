import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { name, password, email, phone } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                password: hashedPassword,
                email,
                phone,
            },
        });

        return NextResponse.json({ message: 'User created', newUser });

        
    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.[0] === 'email') {
            return NextResponse.json({ message: 'This email is already in use' }, { status: 400 });
        }

        console.log(error);
        
    
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
