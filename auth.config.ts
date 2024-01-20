import { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
} satisfies NextAuthConfig;
