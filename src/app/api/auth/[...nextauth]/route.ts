import NextAuth from "next-auth"
import { PrismaClient } from '@prisma/client';
import { authOptions } from "@/app/auth";

const prisma = new PrismaClient();
interface Credentials {
    email: string;
    password: string;
}

interface user {
    id: number;
    name: string;
    email: string;
    role: string;
    password: string;
}




const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
