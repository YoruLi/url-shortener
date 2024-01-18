import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/options";
import { redirect } from "next/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { Add } from "@/components/icons/add";

export default async function Dashboard() {
  const session = await getServerSession(options);

  // if (!session) {
  //   return redirect("/");
  // }
  return (
    <div className="container pl-4 pr-4 md:pl-0 md:pr-0 mx-auto pb-3 flex items-center justify-between">
      <h1 className="title">Dashboard</h1>

      <LinkButton href="/dashboard/create">
        <Add /> Create new link
      </LinkButton>
    </div>
  );
}
