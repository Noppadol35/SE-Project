import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) return null;

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user) {
                    return null;
                }
                const valid = await bcrypt.compare(credentials.password, user.password ? user.password : "");
                if (!valid) {
                    return null;
                }

                const session = await getSession({ req });
                console.log('server session', session);
                console.log('real value', { id: user.id, name: user.name, email: user.email, role: user.role });
                if (session) {
                    session.user.id = user.id;
                    session.user.name = user.name;
                    session.user.email = user.email;
                    session.user.role = user.role;

                    return session;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                    password: user.password,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                    password: profile.password,
                };
            },
        }),
    ],

    adapter: PrismaAdapter(prisma) as any,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },

    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.role = token.role
            }
            return session
        },
        jwt: async ({ token, user, trigger, session }) => {
            if (trigger === 'update') {
                console.log(session);
                return {
                    id: session.id,
                    name: session.name,
                    email: session.email,
                    role: session.role,
                    password: session.password,
                };
            }

            const User = await prisma.user.findFirst({
                where: {
                    id: token.id,
                },
            })
            if (!User) {
                token.id = user!.id
                return token
            }
            return {
                id: User.id,
                name: User.name,
                email: User.email,
                role: User.role,
                password: User.password,
            }
        },
    },
}

export default NextAuth(authOptions)