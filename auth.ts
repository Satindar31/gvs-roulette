import NextAuth from "next-auth";
import Google from "next-auth/providers/google";



export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
  providers: [Google],
//   experimental: {
//     enableWebAuthn: true,
//   },


  pages: {
    signIn: "/login",
  },

  //  By default, the `id` property does not exist on `token` or `session`. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
  },
});
