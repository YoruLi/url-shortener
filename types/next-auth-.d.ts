import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {}

  interface User {
    username: string;
  }
}
