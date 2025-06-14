"use client";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setPending(true);

    if (!email.trim() && !password.trim()) return;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/");
      toast.success("Login successfull");
    } else if (res?.status === 401) {
      setError("Invalid credentials");
      setPending(false);
    } else {
      setError("Something went wrong");
    }
  };

  return (
    <div className="mx-auto flex items-center max-w-84 border border-gray-200 rounded-xl p-4 flex-col mt-8">
      <h1 className="text-2xl text-blue-700 font-semibold">Login</h1>
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
          value={email}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Login"
          className="text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center w-full items-center font-semibold cursor-pointer"
          disabled={pending}
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
    </div>
  );
};

export default Login;
