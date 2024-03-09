import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@auth/prisma-adapter';

const prisma = new PrismaClient();



interface Credentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials | undefined, req: any) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && credentials.password && user.password && (await bcrypt.compare(credentials.password, user.password))) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
          throw new Error('Invalid email or password');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      scope: ['profile', 'email'],
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture;
      }
      return session;
    },
    async redirect({ baseUrl, req }) {
      // Get the user's position from the session
      const userRole = req.session.user?.role;
  
      // Define the redirect URL based on the user's Role
      let redirectUrl = baseUrl;
      if (userRole === 'MANAGER') {
        redirectUrl += '/dashboard/manager'; 
      } else if (userRole === 'CHEF') {
        redirectUrl += '/dashboard/chef'; 
      } else if (userRole === 'WAITER') {
        redirectUrl += '/dashboard/waiter'; 
      }

  
      return redirectUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
