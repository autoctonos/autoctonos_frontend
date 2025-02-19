"use client"

import { useSession } from "next-auth/react";
import LoginButton from "../auth/loginButton";
import LogoutButton from "../auth/logoutButton";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <div className="flex justify-between px-20 py-10 border">
        <h1>Autóctonos</h1>
        {session ? <LogoutButton />: <LoginButton />}
      </div>
    </header>
  );
}
