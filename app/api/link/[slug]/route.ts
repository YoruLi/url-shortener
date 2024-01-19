import { getServerSession } from "next-auth";
import { options } from "../../auth/options";
import { prisma } from "@/utils/db/client";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { NextApiResponse } from "next";
import { headers } from "next/headers";

export const GET = async (
  req: Request,

  { params }: { params: { slug: string } }
) => {
  if (!params.slug) {
    return NextResponse.json({ error: "Missing Slug..." }, { status: 400 });
  }
  try {
    const slug = await prisma.link.findFirst({
      where: {
        slug: {
          equals: params.slug,
        },
      },
    });
    console.log(slug);
    if (!slug) {
      return NextResponse.json({ error: "Slug not found" }, { status: 404 });
    }
    const headersList = headers();
    headersList.set("Cache-Control", "s-maxage=1000000, stale-while-revalidate");
    return NextResponse.json(slug, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error getting slug" }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { slug: string } }) => {
  const body = await req.json();
  const session = await getServerSession(options);

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
