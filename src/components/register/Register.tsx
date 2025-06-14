"use client";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() && !password.trim()) {
      return;
    }

    setPending(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setPending(false);

      toast.success(data.message);
      router.push("/login");
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
      setError(data.message);
      setPending(false);
    }
  };

  return (
    <div className="mx-auto flex items-center max-w-84 border border-gray-200 rounded-xl p-4 flex-col mt-8">
      <h1 className="text-2xl text-blue-700 font-semibold">Register</h1>
      <form className="flex flex-col mt-4 w-full" onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="text-xl text-blue-700 font-semibold mb-2"
        >
          Email:
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="border border-blue-700 rounded-xl p-1 mb-2"
          placeholder=" email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={pending}
        />
        <label
          htmlFor="password"
          className="text-xl text-blue-700 font-semibold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border border-blue-700 rounded-xl p-1 mb-2"
          placeholder=" password"
          disabled={pending}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Register"
          className="text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center w-full items-center font-semibold cursor-pointer"
        />
        {!!error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            <p className="flex gap-2 items-center">
              <TriangleAlert />
              {error}
            </p>
          </div>
        )}
      </form>
      <Link href="/login" className="mt-2  d text-blue-700">
        You have an account? <span className="font-bold">Sign Up</span>
      </Link>
    </div>
  );
};

export default Register;
