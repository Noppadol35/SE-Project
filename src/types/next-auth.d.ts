import { Role } from "@prisma/client";
import type { User } from "next-auth";
import "next-auth";

type UserID = string;

declare module "next-auth/jwt" {
    interface JWT {
        id: UserID;
        role: string;
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            id: UserID;
            role: string;
        };
    }
}
