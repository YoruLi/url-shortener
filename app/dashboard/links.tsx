import React from "react";
import { getLinks } from "../actions";
import { Session } from "next-auth";
import Loading from "./loading";
import Card from "@/components/ui/card";

export default async function Links({ session }: { session: Session }) {
  const allLinks = await getLinks(session);
  return allLinks?.length === 0 ? (
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
  );
}
