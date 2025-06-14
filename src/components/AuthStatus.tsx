"use client";
import { useAuth } from "@/hooks/useAuth";

export default function AuthStatus() {
  const { session, status, signIn, signOut } = useAuth();

  if (status === "loading") return <p>Ładuję...</p>;

  if (session) {
    return (
      <div>
        Zalogowany jako: {session.user?.email}
        <button onClick={() => signOut()}>Wyloguj się</button>
      </div>
    );
  }

  return (
    <div>
      Nie zalogowany
      <button onClick={() => signIn()}>Zaloguj się</button>
    </div>
  );
}
