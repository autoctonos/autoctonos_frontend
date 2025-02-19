import type { NextAuthConfig } from "next-auth";
import { credentialsProvider } from "./providers/credentialsProvider";
import { jwtCallback } from "./callbacks/jwt";
import { sessionCallback } from "./callbacks/sessions";

export const authOptions: NextAuthConfig = {
  providers: [credentialsProvider],
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
  pages: {
    signIn: "/login"
  }
};
