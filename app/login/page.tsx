import LoginPage from "@/modules/auth/templates/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
      <LoginPage />
  );
}
