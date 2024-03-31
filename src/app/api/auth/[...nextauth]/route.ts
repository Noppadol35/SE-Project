import NextAuth from "next-auth";
import { authOptions } from "@/app/auth";

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
