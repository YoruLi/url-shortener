import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
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
}

export const config = {
  matcher: ["/go/:slug*"],
};
