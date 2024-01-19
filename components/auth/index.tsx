"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { GitHub } from "../icons/github";
import { LinkButton } from "../ui/link-button";
import { useState } from "react";
import { SignOut } from "../icons/sign-out";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { currentUser } from "@/utils/current-user";
import { useCurrentUser } from "@/hooks/use-session";

export const Auth = () => {
  const { data: session, status } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("github", {
        callbackUrl: "/dashboard",
      });
      router.push("/dashboard");
      toast.success("Logged in successfuly");
    } catch (error: any) {
      toast.error("Something was wrong");
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
        <SignOut className="fill-primary size-4" />
      </LinkButton>
    </>
  );
};
