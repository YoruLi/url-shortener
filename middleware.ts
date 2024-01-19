import { NextResponse } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { protectedRoutes } from "./utils/protected-routes";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const pathname = req.nextUrl?.pathname;
    const { origin } = new URL(req.url);
    const token = req.nextauth.token;

    const isAccessingSensitiveRoute = protectedRoutes.some((route) => pathname.startsWith(route));
    const isLoginPage = pathname.startsWith("/auth");

    if (isLoginPage) {
      if (!token && isAccessingSensitiveRoute) {
        return NextResponse.redirect(new URL("/auth", origin));
      }
    }
  },
  {
    pages: {
      signIn: "/auth",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized: () => {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/", "/dashboard/:path*"],
};
