import NextAuth, { User, type NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db/client";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],

  events: {
    signOut: async ({}) => {
      const session = await getServerSession(authOptions);
      const deleteAccount = await prisma.account.delete({
        where: {
          id: session?.user?.id,
        },
      });
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | AdapterUser }) {
      if (typeof user !== "undefined") {
        return user as unknown as JWT;
      }
      return token;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
      },
    }),
  },
};
