"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    console.log("userr", username);
    console.log("password", password);
    await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/auth/sign-in?code=200",
    })
      .then((result) => {
        console.log("success", result);
      })
      .catch((err) => {
        console.log("err catch", err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-40 space-y-4 max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      <label className="flex flex-col">
        <span className="mb-2 text-gray-700">Username:</span>
        <input
          name="username"
          type="text"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <label className="flex flex-col">
        <span className="mb-2 text-gray-700">Password:</span>
        <input
          name="password"
          type="password"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <button
        type="submit"
        className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Login
      </button>
    </form>
  );
}
