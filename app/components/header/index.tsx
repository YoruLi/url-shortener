import React from "react";
import { Logo } from "../icons/logo";
import { LinkButton } from "../ui/link-button";
import { Login } from "../icons/login";

export default function Header() {
  return (
    <header className="sticky top-0 w-full py-4">
      <div className="mx-8 flex justify-between">
        <div className="flex gap-4 items-center opacity-80">
          <Logo className="fill-primary size-7" />
          <h1 className="font-semibold text-xl">Lym</h1>
        </div>
        <LinkButton>
          Sign in
          <Login className="fill-primary size-4" />
        </LinkButton>
      </div>
    </header>
  );
}
