"use client";
import React from "react";
import NextProgressBar from "nextjs-progressbar";
export default function ProgressBar() {
  return (
    <NextProgressBar
      color="#979797"
      startPosition={0.3}
      stopDelayMs={200}
      height={2}
      showOnShallow={true}
    />
  );
}
