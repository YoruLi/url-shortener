import React from "react";
import { getLinks } from "../actions";

import Card from "@/components/ui/card";

export default async function Links() {
  const allLinks = await getLinks();
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
