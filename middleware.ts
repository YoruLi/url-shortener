import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { origin } = new URL(req.url);
  const pathname = req.nextUrl?.pathname;

  const parts = pathname.split("/");
  const shorUrl = parts[parts.length - 1];
  try {
    const data = await fetch(`${origin}/api/link/${shorUrl}`);

    if (data.status === 404) {
      return NextResponse.redirect(origin);
    }
    const res = await data.json();

    if (data?.url) {
      return NextResponse.redirect(new URL(res.url));
    }
  } catch (error) {
    console.error(error);
  }
}

export const config = {
  matcher: ["/go/:slug*"],
};
