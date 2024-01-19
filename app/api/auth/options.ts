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

      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],

  secret: "secret",
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth",
  },
  callbacks: {
<<<<<<< HEAD
    session: ({ session, newSession }) => ({
      ...session,
      user: {
        ...session.user,
        id: newSession.id,
        username: newSession.username,
=======
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.username,
>>>>>>> 78a9d64cfeefb679f1ba35e047cdf94009093b10
      },
    }),
  },
});
