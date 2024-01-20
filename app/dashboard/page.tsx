import React from "react";

import { redirect } from "next/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { Add } from "@/components/icons/add";
import Card from "@/components/ui/card";
import { getLinks } from "../actions";
import { auth } from "@/auth";
import Loading from "./loading";
import Links from "./links";

export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return redirect("/auth");
  }

  return (
    <section className="container pl-4 pr-4 md:pl-0 md:pr-0 mx-auto pb-3">
      <div className=" flex items-center justify-between mb-10">
        <h1 className="title">Dashboard</h1>

        <LinkButton href="/dashboard/create">
          <Add /> Create link
        </LinkButton>
      </div>
      <React.Suspense fallback={<Loading />}>
        <Links session={session} />
      </React.Suspense>
    </section>
  );
}
