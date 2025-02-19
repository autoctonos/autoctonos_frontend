import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    userName: string;
    role?: string; // Hacemos `role` opcional
  }

  interface Session {
    user: User;
    accessToken?: string;
  }
}
