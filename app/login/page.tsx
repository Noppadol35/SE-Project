"use client"
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type SignInFormValues = {
    email: string;
    password: string;
};

export default function SignIn() {
    const [formData, setFormData] = useState<SignInFormValues>({
        email: "",
        password: "",
    });
    const router = useRouter();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (result) {
                console.error(result);
            } else {
                router.push("/profile");
            }
        } catch (error) {
            console.log("error", error);
        }
    };

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
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded mb-4"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}
