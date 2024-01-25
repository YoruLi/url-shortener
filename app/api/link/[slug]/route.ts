import prisma from "@/lib/db/client";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

type CombineRequest = Request & NextApiRequest;

export const GET = async (req: CombineRequest, { params }: { params: { slug: string } }) => {
  const res = NextResponse.next();

  if (!params?.slug || typeof params.slug !== "string") {
    return NextResponse.json({ error: "Missing Slug..." }, { status: 400 });
  }
  const { slug } = params;
  try {
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

    res.headers.set("Cache-Control", "s-maxage=1000000, stale-while-revalidate");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error getting slug" }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { slug: string } }) => {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "User not logged in." }, { status: 401 });
  }
  try {
    const data = await prisma.link.update({
      where: {
        id: body.id,
      },
      data: {
        ...body,
        creatorId: session?.user?.id,
      },
    });
    revalidateTag("links");
    return NextResponse.json({ editedLink: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error creating a new link." }, { status: 500 });
  }
};
