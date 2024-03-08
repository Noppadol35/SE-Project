import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface UserRequest {
  name: string;
  password: string;
  email: string;
  phone: string;
}

export async function POST(request: Request) {
  try {
    const { name, password, email, phone }: UserRequest = await request.json();
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
  } catch   {
    if (Error.code === 'P2002' && Error.meta?.target?.[0] === 'email') {
      return NextResponse.json({ message: 'This email is already in use' }, { status: 400 });
    }

    console.error(Error);

    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
