import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname;

  const shorUrl = pathname.split("/").pop();

  try {
    const data = await fetch(`${req.nextUrl.origin}/api/link/${shorUrl}`);

    if (data.status === 404) {
      return NextResponse.redirect(req.nextUrl.origin);
    }

    const res = await data.json();
    if (data?.url) {
      return NextResponse.redirect(new URL(res.url));
    }
  } catch (error) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
});

export const config = {
  matcher: ["/go/:slug*"],
};
