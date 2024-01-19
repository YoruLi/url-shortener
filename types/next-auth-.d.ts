import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
    } & DefaultSession["user"];
  }
  interface User {
    username: string;
  }
}
