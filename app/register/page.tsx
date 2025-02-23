import RegisterPage from "@/modules/auth/templates/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return (
      <RegisterPage />
  );
}
