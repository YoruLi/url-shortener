import { NextResponse } from "next/server";
import { prisma } from "@/utils/db/client";
import { auth } from "@/auth";

export const GET = async (req: Request, { params }: { params: { slug: string } }) => {
  const session = await auth();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const data = await prisma.link.findFirst({
        where: {
          slug: {
            equals: slug,
          },
        },
      });

      if (!data) {
        return NextResponse.json({ error: "Slug not found" }, { status: 404 });
      }

      // res.setHeader("Cache-Control", "s-maxage=1000000, stale-while-revalidate");
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {}
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
  const session = await auth();
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
