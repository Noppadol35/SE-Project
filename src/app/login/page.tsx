"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedSession = localStorage.getItem("next-auth.session");
    if (storedSession !== null) {
      const session = JSON.parse(storedSession);
      if (session) {
        setUser(session.user);
      }
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      const storedSession = localStorage.getItem("next-auth.session");

      if (storedSession !== null) {
        const session = JSON.parse(storedSession);

        if (session && session.user) {
          const userPosition = session.user.role;
          const redirectedUrl = getRedirectUrl(userPosition);

          if (redirectedUrl) {
            router.push(redirectedUrl);
          } else {
            console.warn(
              "NO REDIRECT URL FOUND FOR USER POSITION: ",
              userPosition
            );
          }
        }
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  type Role = "MANAGER" | "CHEF" | "WAITER" | "CASHIER";

  const getRedirectUrl = (role: Role) => {
    const redirectMap: Record<Role, string> = {
      MANAGER: "/dashboard/manager",
      CHEF: "/dashboard/chef",
      WAITER: "/dashboard/waiter",
      CASHIER: "/dashboard/cashier",
    };

    return redirectMap[role] || "/";
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md"
      >
        {/* <Users /> */}
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
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          Login
        </button>
        <button
          onClick={() => signIn("google")}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Sign in with Google
        </button>
        <p className=" flex items-center justify-between mt-5 ">
          <label>New account?</label>
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
