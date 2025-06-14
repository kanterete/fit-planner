"use client";
import React, { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!login.trim() && !password.trim()) {
      setError("all fields are necessary.");
      return;
    }

    setLogin("");
    setPassword("");

    toast("Login successfull ✅");
  };

  return (
    <div className="mx-auto flex items-center max-w-84 border border-gray-200 rounded-xl p-4 flex-col mt-8">
      <h1 className="text-2xl text-blue-700 font-semibold">Login</h1>
      <form
        action="POST"
        className="flex flex-col mt-4 w-full"
        onSubmit={handleSubmit}
      >
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
          onChange={(e) => setLogin(e.target.value)}
          value={login}
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
        />
        <input
          type="submit"
          value="Login"
          className="text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center w-full items-center font-semibold cursor-pointer"
        />
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
