"use client";
import React, { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!!login.trim() && !!password.trim()) return;

    setLogin("");
    setPassword("");

    toast("Register successfull ✅");
  };

  return (
    <div className="mx-auto flex items-center max-w-84 border border-gray-200 rounded-xl p-4 flex-col mt-8">
      <h1 className="text-2xl text-blue-700 font-semibold">Register</h1>
      <form
        action="POST"
        className="flex flex-col mt-4 w-full"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="login"
          className="text-xl text-blue-700 font-semibold mb-2"
        >
          Login:
        </label>
        <input
          type="text"
          name="login"
          id="login"
          className="border border-blue-700 rounded-xl p-1 mb-2"
          placeholder=" login"
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
          value="Register"
          className="text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center w-full items-center font-semibold cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Register;
