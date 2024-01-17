"use client";

import { UpTransition } from "@/components/motion";
import { LinkButton } from "@/components/ui/link-button";

export default function Home() {
  return (
    <div className="section">
      <UpTransition>
        <h1 className="text-4xl md:text-6xl mb-2 md:mb-5 font-semibold">URL Shorterner</h1>
      </UpTransition>

      <UpTransition delay={0.2}>
        <h3 className="text-sm md:text-lg mb-2 md:mb-5 font-semibold  animate-pulse">
          Create shorter URLS with Lym
        </h3>
      </UpTransition>

      <UpTransition delay={0.4}>
        <LinkButton href="/dashboard">Getting started</LinkButton>
      </UpTransition>
    </div>
  );
}
