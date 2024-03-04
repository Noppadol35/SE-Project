"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      })

      if(result?.error){
        console.log(result?.error)
      } else {
        router.push("/profile")
      }
    } catch (error) {
        console.error("An unexpected error happened:", error);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mb-4">
          Login
        </button>
      </form>
    </div>
  );
}
