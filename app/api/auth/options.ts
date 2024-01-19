import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "@/utils/db/client";

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,

      // profile(profile) {
      //   return {
      //     id: profile.id.toString(),
      //     name: profile.name || profile.login,
      //     username: profile.login,
      //     email: profile.email,
      //     image: profile.avatar_url,
      //   };
      // },
    }),
  ],

  secret: "secret",
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, newSession }) {
      session.user = newSession;
      return session;
    },
  },
});
