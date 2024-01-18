"use client";
import React from "react";
import { Logo } from "../icons/logo";

import { Auth } from "../auth";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" relative top-0 w-full h-full py-4">
      <div className="mx-8 flex justify-between">
        <Link href={"/"} className="flex gap-4 items-center opacity-80">
          <Logo className="fill-primary size-7" />
          <h1 className="font-semibold text-xl">Lym</h1>
        </Link>
        <Auth />
      </div>
    </header>
  );
}
