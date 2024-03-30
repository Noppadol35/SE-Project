import type { NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getServerSession } from "next-auth/next";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { PrismaClient } from '@prisma/client';
import { request, response } from "express";

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
            async authorize(credentials) {
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
    // jwt: {
    //     async encode({ secret, token }) {
    //         const encodedToken = jwt.sign(
    //             token && typeof token === 'object' ? { ...token } : {},
    //             secret,
    //             { algorithm: 'HS512' }
    //         )
    //         return encodedToken
    //     },
    //     async decode({ secret, token }) {
    //         if (!secret || !token) {
    //             throw new Error('Secret and token must be provided');
    //         }
    //         const decodedToken = jwt.verify(token, secret) as JwtPayload
    //         if (!decodedToken) {
    //             return null
    //         }

    //         const { id, role, ...rest } = decodedToken as JWT

    //         return {
    //             id,
    //             role,
    //             ...rest,
    //         }
    //     },
    // },

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
        jwt: async ({ token, user, session }) => {
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
        // async redirect({ url, baseUrl }) {
        //     const baseUrlWithTrailingSlash = `${baseUrl}/dashboard`

        //     if (url === baseUrlWithTrailingSlash) {
        //         // const session = await getServerSession(authOptions)
        //         // const session = null;

        //         if (session?.user?.role === 'CHEF') {
        //             return `${baseUrl}/chef`
        //         } else if (session?.user?.role === 'MANAGER') {
        //             return `${baseUrl}/manager`
        //         } else if (session?.user?.role === 'WAITER') {
        //             return `${baseUrl}/waiter`
        //         } else if (session?.user?.role === 'CASHIER') {
        //             return `${baseUrl}/cashier`
        //         } else {
        //             return `${baseUrl}/`
        //         }
        //     }

        //     return baseUrlWithTrailingSlash
        // },
    },
}

export default NextAuth(authOptions)