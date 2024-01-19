// import { NextResponse } from "next/server";
// import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
// import { protectedRoutes } from "../utils/protected-routes";

// export default withAuth(
//   async function middleware(req: NextRequestWithAuth) {
//     const pathname = req.nextUrl?.pathname;
//     const { origin } = new URL(req.url);
//     const token = req.nextauth.token;

//     const isAccessingSensitiveRoute = protectedRoutes.some((route) => pathname.startsWith(route));
//     const isLoginPage = pathname.startsWith("/auth");

//     if (isLoginPage) {
//       if (!token && isAccessingSensitiveRoute) {
//         return NextResponse.redirect(new URL("/auth", origin));
//       }
//     }

//     const slug = req.nextUrl.pathname.split("/").pop();

//     const data = await fetch(`${origin}/api/link?slug=${slug}`);

//     if (data.status == 404) {
//       return NextResponse.redirect(req.nextUrl.origin);
//     }

//     const res = await data.json();

//     if (res.url) {
//       return NextResponse.redirect(new URL(res.url, origin));
//     }
//   },
//   {
//     pages: {
//       signIn: "/auth",
//     },
//     secret: "secret",
//     callbacks: {
//       authorized: ({ token }) => {
//         return true;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: ["/dashboard/", "/dashboard/:path*", "/:slug*"],
// };

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export const apiAuthPrefix = "/auth";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const session = await auth();

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // if (isApiAuthRoute) {
  //   return null;
  // }

  // if (nextUrl.pathname === "/auth") {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL("/dashboard", nextUrl));
  //   }
  //   return null;
  // }

  // if (!isLoggedIn) {
  //   return Response.redirect(new URL(`/auth`, nextUrl));
  // }

  // return null;

  const slug = req.nextUrl.pathname.split("/").pop();

  const data = await fetch(`${origin}/api/link?slug=${slug}`);
  if (data.status === 200) {
    const res = await data.json();

    if (res.url) {
      return NextResponse.redirect(new URL(res.url, origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard", "/:slug*"],
};
