"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { GitHub } from "../icons/github";
import { LinkButton } from "../ui/link-button";
import { useState } from "react";

export const Auth = () => {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("github", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut({
        callbackUrl: "/",
      });
    } catch (error) {}
  };

  if (status === "loading") {
    return <LinkButton>Loading...</LinkButton>;
  }

  if (status === "unauthenticated") {
    return (
      <LinkButton onClick={handleSignIn} disabled={loading}>
        {loading ? "Loading..." : "Sign in"}
        <GitHub className="fill-primary size-4" />
      </LinkButton>
    );
  }
  return (
    <>
      <LinkButton onClick={handleSignOut} disabled={loading}>
        {loading ? "Loading..." : "Sign out"}
        <GitHub className="fill-primary size-4" />
      </LinkButton>
    </>
  );
};
