"use client";

import { signIn } from "next-auth/react";

interface LoginButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function LoginButton({ className }: LoginButtonProps) {
  return (
    <button
      onClick={() => signIn()}
      className={`py-2 border border-black p-5 rounded-xl hover:bg-black hover:text-white ${className}`}
    >
      Iniciar sesión
    </button>
  );
}
