"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirectBasedOnRole } from "@/lib/utils";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // เพิ่มตัวแปรสถานะ loading

  const { data } = useSession();
  useEffect(() => {
    const session = data as any;

    if (!session) return;
    if (!session?.session?.user?.role) return;

    router.push(redirectBasedOnRole(session.session.user.role)); // ใช้ฟังก์ชัน redirectBasedOnRole จากไฟล์ utils.ts
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // เริ่มต้นโหลดข้อมูล

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        alert(result.error);
        setLoading(false); // หยุดโหลดข้อมูล
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="bg-white p-8 rounded-md shadow-md flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 relative"
          disabled={loading} // ปรับ disabled attribute ของปุ่มตามสถานะ loading
        >
          {loading && (
            <div className="absolute inset-0 bg-gray-600 opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition duration-300"
        >
          Sign in with Google
        </button>
        <p className="mt-4">
          <span className="mr-1">Don't have an account?</span>
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
