"use client";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
