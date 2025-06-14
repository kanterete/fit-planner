"use client";
import { useAuth } from "@/hooks/useAuth";

export default function AuthStatus() {
  const { session, status, signIn, signOut } = useAuth();

  if (status === "loading") return <p>Ładuję...</p>;

  if (session) {
    return (
      <div>
        Zalogowany jako: {session.user?.email}
        <button
          className="text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center w-fit items-center font-semibold cursor-pointer"
          onClick={() => signOut()}
        >
          Wyloguj się
        </button>
      </div>
    );
  }

  return (
    <div>
      Nie zalogowany
      <button
        className="text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center w-fit items-center font-semibold cursor-pointer"
        onClick={() => signIn()}
      >
        Zaloguj się
      </button>
    </div>
  );
}
