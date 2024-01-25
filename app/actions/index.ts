"use server";
import { Session, getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db/client";

import { link } from "@prisma/client";
import { authOptions } from "@/lib/auth-options";

export const updateLink = async (values: any) => {
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      throw new Error("User not logged in");
    }
    const checkSlug = await prisma.link.findUnique({
      where: {
        slug: values.slug || "",
      },
    });

    if (checkSlug) {
      throw new Error("Please, try another slug. This one is already in use");
    }

    await prisma.link.update({
      where: {
        id: values.id,
      },
      data: {
        ...values,
        creatorId: session?.user.id,
      },
    });
  } catch (error) {
    throw error;
  }
  revalidatePath("/dashboard");
};

export const deleteLink = async (id: number) => {
  await prisma.link.delete({
    where: { id },
  });
  revalidatePath("/dashboard");
};

export const createLink = async (values: any) => {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      throw new Error("User not logged in");
    }
    const checkSlug = await prisma.link.findFirst({
      where: {
        slug: values.slug || "",
      },
    });

    if (checkSlug) {
      throw new Error("Please, try another slug. This one is already in use");
    }

    await prisma.link.create({
      data: {
        slug: values.slug,
        url: values.url,
        creatorId: session?.user?.id,
      },
    });
  } catch (error) {
    throw error;
  }
  revalidatePath("/dashboard");
};

export const getLinks = async (session: Session): Promise<link[]> => {
  const result = await prisma.link.findMany({
    where: {
      creatorId: session?.user?.id,
    },
  });

  return result;
};
