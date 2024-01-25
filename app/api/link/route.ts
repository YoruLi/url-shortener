import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  try {
    const allLinks = await prisma.link.findMany({
      where: {
        creatorId: session?.user?.id,
      },
    });
    return NextResponse.json(allLinks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error getting links" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const { slug, url } = body;

  if (!session) {
    return NextResponse.json({ message: "User not logged in." }, { status: 401 });
  }
  try {
    const data = await prisma.link.create({
      data: {
        slug,
        url,
        creatorId: session?.user?.id,
      },
    });

    return NextResponse.json({ newLink: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating a new link." }, { status: 500 });
  }
};
