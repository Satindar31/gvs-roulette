import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate' 


const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

let prismaClient: PrismaClient

if (process.env.NODE_ENV !== "production") {
  if (!globalForPrisma.prisma) {
	globalForPrisma.prisma = new PrismaClient()
  }
  prismaClient = globalForPrisma.prisma
} else {
  prismaClient = new PrismaClient()
}

export const prisma = prismaClient.$extends(withAccelerate())