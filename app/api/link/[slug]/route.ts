import { getServerSession } from "next-auth";
import { options } from "../../auth/options";
import { prisma } from "@/utils/db/client";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";

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
