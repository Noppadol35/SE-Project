"use client";
// pages/auth/signout.js
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      signOut({ redirect: false });
    } else if (status === "unauthenticated") {
      redirect("");
    }
  }, [status]);

  return <div></div>;
}
