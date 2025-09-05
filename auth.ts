import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import simplelogin from "next-auth/providers/simplelogin";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, simplelogin],
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: true,
  // experimental: {
  //   enableWebAuthn: true,
  // },

  pages: {
    signIn: "/login",
  },
});