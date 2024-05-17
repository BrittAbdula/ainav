import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [Google],
  callbacks: {
    "jwt"({token, user}) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({session, token}) {
      session.user.id = token.id as string;
      return session
    },
  }
})