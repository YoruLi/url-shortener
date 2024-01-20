import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

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

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(origin);
    }
  }

  if (!session && isAccessingSensitiveRoute) {
    return NextResponse.redirect(`${origin}/auth`);
  }

  if (session && isAccessingSensitiveRoute) {
    return NextResponse.next();
  }
  if (nextUrl.pathname === "/auth") {
    if (isLoggedIn && session) {
      return Response.redirect(`${origin}/dashboard`);
    }
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
  matcher: ["/go/:slug*", "/dashboard/:path*"],
};
