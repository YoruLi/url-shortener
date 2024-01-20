import { Add } from "@/components/icons/add";
import { LinkButton } from "@/components/ui/link-button";
import React from "react";

export default function Loading() {
  return (
    <>
      <section className="container pl-4 pr-4 md:pl-0 md:pr-0 mx-auto pb-3">
        <div className=" flex items-center justify-between mb-10">
          <h1 className="title">Dashboard</h1>

          <LinkButton href="/dashboard/create">
            <Add /> Create link
          </LinkButton>
        </div>

        <ul
          className="grid gap-4 w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
          }}
        >
          {[...Array(Math.floor(Math.min(Math.random() * 10))).keys()].map((i) => (
            <li key={i}>
              <div
                className=" h-[104px] w-full mx-auto rounded-md bg-white/5 animate-pulse transition"
                style={{
                  animationDelay: `${200 * i}ms`,
                }}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
