
"use client";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChefOrder } from "@/components/Dashboard/Chef/chefOrder";



export default function Chef() {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") router.push("/login");
  // }, [status, router]);
  return (
    // status === "authenticated" &&
    // session.user && (
    <div className="">
      <ChefOrder />
    </div>
  );
}