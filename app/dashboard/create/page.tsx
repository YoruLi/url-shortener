import React from "react";
import { auth } from "@/auth";
import LinkForm from "@/components/form/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export default async function CreateLinkPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="container pt-8 mx-auto w-[90%]">
      <h1 className="title text-center mb-10">Create new link</h1>
      <LinkForm type="Insert" />
    </div>
  );
}
