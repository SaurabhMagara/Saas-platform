import { PrismaClient } from "@prisma/client";

// steps before creating new prisma client
// 1. npx prisma migrate dev --> migrating your db to prisma
// 2. npx prisma generate --> It generates required types according to your schema

export const prismaClient = new PrismaClient();