import React from "react";

import { redirect } from "next/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { Add } from "@/components/icons/add";
import Card from "@/components/ui/card";
import { getLinks } from "../actions";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return redirect("/auth");
  }

  const allLinks = await getLinks(session);
  return (
    <section className="container pl-4 pr-4 md:pl-0 md:pr-0 mx-auto pb-3">
      <div className=" flex items-center justify-between mb-10">
        <h1 className="title">Dashboard</h1>

        <LinkButton href="/dashboard/create">
          <Add /> Create link
        </LinkButton>
      </div>
      {allLinks.length === 0 ? (
        <span className=" text-center animate-pulse font-sans block capitalize">
          No links available..
        </span>
      ) : (
        <div
          className="grid gap-4 w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
          }}
        >
          {allLinks?.map((link) => (
            <Card key={link.id} {...link} />
          ))}
        </div>
      )}
    </section>
  );
}
