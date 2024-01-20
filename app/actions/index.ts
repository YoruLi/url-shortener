"use server";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/db/client";
import { auth } from "@/auth";

export const updateLink = async (values: any) => {
  const session = await auth();
  await prisma.link.update({
    where: {
      id: values.id,
    },
    data: {
      ...values,
      creatorId: session?.user.id,
    },
  });
  revalidatePath("/dashboard");
};

export const deleteLink = async (id: number) => {
  await prisma.link.delete({
    where: { id },
  });
  revalidatePath("/dashboard");
};

export const createLink = async (values: any) => {
  const session = await auth();

  const checkSlug = await prisma.link.findUnique({
    where: {
      slug: values.slug || "",
    },
  });

  if (checkSlug) {
    return;
  }

  await prisma.link.create({
    data: {
      slug: values.slug,
      url: values.url,
      creatorId: session?.user?.id,
    },
  });

  revalidatePath("/dashboard");
};

export const getLinks = async (session: Session) => {
  const result = await prisma?.link.findMany({
    where: {
      creatorId: session?.user?.id,
    },
  });

  return result;
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
