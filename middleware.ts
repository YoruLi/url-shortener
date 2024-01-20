import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export const apiAuthPrefix = "/api/link";

export default auth(async (req) => {
  const { nextUrl } = req;
  const { origin } = new URL(req.url);
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl?.pathname;
  const session = await auth();

  const isAccessingSensitiveRoute = ["/dashboard", "/dashboard/create"].some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = "/auth";

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
  }

  if (!session && isAccessingSensitiveRoute) {
    return NextResponse.redirect(new URL("/auth", origin));
  }

  if (nextUrl.pathname === "/auth") {
    if (isLoggedIn && session) {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
    return null;
  }

  const parts = pathname.split("/");
  const shorUrl = parts[parts.length - 1];
  try {
    const data = await fetch(`${origin}/api/link/${shorUrl}`);

    if (data.status === 404) {
      return NextResponse.redirect(origin);
    }
    const res = await data.json();

    if (data?.url) {
      console.log(res.url);
      return NextResponse.redirect(res.url);
    }
  } catch (error) {
    console.error(error);
  }
});

export const config = {
  matcher: ["/go/:slug*", "/api/:path*", "/dashboard/:path*"],
};
