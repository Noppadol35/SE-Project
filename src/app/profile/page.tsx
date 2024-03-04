"use client"
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);
  return (
    status === "authenticated" &&
    session.user && (
      <div className="flex h-screen items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md">
        <h1>Profile</h1>
        <p>Welcome, {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <p>Position: {session.user.position}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Logout
        </button>
        </div>
      </div>
    )
  );
}
