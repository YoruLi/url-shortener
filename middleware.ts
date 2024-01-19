import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export const apiAuthPrefix = "/auth";

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
  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL("/", nextUrl));
  //   }
  //   return null;
  // }

  // if (!isLoggedIn) {
  //   if (!session?.user && isAccessingSensitiveRoute) {
  //     return NextResponse.redirect(new URL("/auth", nextUrl));
  //   }
  // }

  // if (nextUrl.pathname === "/auth") {
  //   if (isLoggedIn && session?.user) {
  //     return Response.redirect(new URL("/dashboard", nextUrl));
  //   }
  //   return null;
  // }

  const parts = pathname.split("/");
  const shorUrl = parts[parts.length - 1];
  try {
    const data = await fetch(`http://localhost:3000/api/link?slug=${shorUrl}`, { method: "GET" });

    if (data.status === 404) {
      return NextResponse.redirect(req.nextUrl.origin);
    }
    const res = await data.json();
    console.log(res);
    if (data?.url) {
      console.log(res.url);
      return NextResponse.redirect(res.url);
    }
  } catch (error) {
    console.error("Error parsing JSON response:", error);
  }
});

export const config = {
  matcher: ["/go/:slug*"],
};
