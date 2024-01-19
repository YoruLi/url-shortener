import { prisma } from "@/utils/db/client";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/auth";

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

export const GET = async (req: CombineRequest, res: CombineResponse) => {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") as string;

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Missing Slug..." }, { status: 400 });
  }
  try {
    const data = await prisma.link.findFirst({
      where: {
        slug: {
          equals: slug,
        },
      },
    });
    console.log(data);
    if (!slug) {
      return NextResponse.json({ error: "Slug not found" }, { status: 404 });
    }

    res.setHeader("Cache-Control", "s-maxage=1000000, stale-while-revalidate");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error getting slug" }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { slug: string } }) => {
  const body = await req.json();
  const session = await auth();

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
