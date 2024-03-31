import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface UserRequest {
  name: string;
  password: string;
  email: string;
  phone: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, password, phone }: UserRequest = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      },
    });

    return NextResponse.json({ message: "User created", newUser });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
