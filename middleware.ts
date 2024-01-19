import { NextResponse } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { protectedRoutes } from "./utils/protected-routes";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const pathname = req.nextUrl?.pathname;
    const { origin } = new URL(req.url);
    const token = req.nextauth.token;
    console.log(token);
    const isAccessingSensitiveRoute = protectedRoutes.some((route) => pathname.startsWith(route));
    const isLoginPage = pathname.startsWith("/auth");

    if (isLoginPage) {
      if (!token && isAccessingSensitiveRoute) {
        return NextResponse.redirect(new URL("/auth", origin));
      }
    }

    const slug = req.nextUrl.pathname.split("/").pop();

    const data = await fetch(`${origin}/api/link?slug=${slug}`);

    if (data.status == 404) {
      return NextResponse.redirect(req.nextUrl.origin);
    }

    const res = await data.json();

    if (res.url) {
      return NextResponse.redirect(new URL(res.url, origin));
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
  matcher: ["/dashboard/", "/dashboard/:path*", "/:slug*"],
};
