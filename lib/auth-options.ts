import NextAuth, { User, type NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db/client";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { signOut } from "next-auth/react";

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
  pages: {
    signIn: "/auth",
  },
  events: {
    async signOut({ session, token }) {
      console.log(session);
      console.log(token);
      console.log(await prisma.account.findMany());
      if (token.sub) {
        const existingAccount = await prisma.account.findUnique({
          where: {
            userId: token.sub,
            provider_providerAccountId: {
              provider: "github",
              providerAccountId: "111911846", // Debes proporcionar un valor aquí, incluso si es una cadena vacía si es requerido
            },
          },
        });
        console.log(existingAccount);
        if (existingAccount) {
          const deletedAccount = await prisma.account.delete({
            where: {
              userId: token.sub,
              provider_providerAccountId: {
                provider: "github",
                providerAccountId: "111911846", // Debes proporcionar un valor aquí, incluso si es una cadena vacía si es requerido
              },
            },
          });
          console.log(deletedAccount);
        }
      }
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      console.log(user);
      console.log(account);

      if (account?.provider !== "credentials") return true;

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },
};
