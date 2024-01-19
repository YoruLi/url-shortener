"use server";
import { Session, getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/db/client";
import { options } from "../api/auth/options";

export const updateLink = async (values: any) => {
  const session = await getServerSession(options);
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
  const session = await getServerSession(options);

  const checkSlug = await prisma.link.findUnique({
    where: {
      slug: values.slug || "",
    },
  });

  console.log(checkSlug);
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
      creatorId: session.user.id,
    },
  });

  return result;
};