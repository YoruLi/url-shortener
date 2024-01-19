import { prisma } from "@/utils/db/client";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/auth";

type CombineRequest = Request & NextApiRequest;

export const GET = async (req: CombineRequest, { params }: { params: { slug: string } }) => {
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

    // res.setHeader("Cache-Control", "s-maxage=1000000, stale-while-revalidate");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error getting slug" }, { status: 500 });
  }
};
