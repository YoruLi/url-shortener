import NextAuth, { Session } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/utils/db/client";
import authConfig from "@/auth.config";
import { getUserById } from "./app/actions";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    async session({ session, token }: { session: Session; token?: any }): Promise<Session> {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }

      token.email = existingUser.email;
      token.name = existingUser.name;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
