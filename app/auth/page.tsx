import { Auth } from "@/components/auth";
import { GitHub } from "@/components/icons/github";
import { UpTransition } from "@/components/motion";

import React from "react";

export default function AuthPage() {
  return (
    <section className="section">
      <UpTransition>
        <div className="flex items-center gap-3 mb-2 md:mb-5">
          <h1 className="text-4xl  md:text-6xl font-semibold capitalize">Sign in with</h1>
          <GitHub className="size-20" />
        </div>
      </UpTransition>

      <UpTransition delay={0.4}>
        <Auth />
      </UpTransition>
    </section>
  );
}
