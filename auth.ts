import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// import { PrismaAdapter } from "@auth/prisma-adapter"



export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [Google],
  trustHost: true,
  // debug: true,
//   experimental: {
//     enableWebAuthn: true,
//   },

  pages: {
    signIn: "/login",
  },
});