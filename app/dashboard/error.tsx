"use client"; // Error components must be Client Components

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="section">
      <h2 className="title">Something went wrong!</h2>
      <button onClick={() => reset()} className="text-primary/50">
        Try again
      </button>
    </div>
  );
}
