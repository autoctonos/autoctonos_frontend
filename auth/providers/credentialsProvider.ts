import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../services/loginUser";

interface Credentials {
  email: string;
  password: string;
}

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text", placeholder: "tu@email.com" },
    password: { label: "Contraseña", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Email y contraseña son obligatorios");
    }
    const userCredentials: Credentials = {
      email: String(credentials.email),
      password: String(credentials.password),
    };
    const user = await loginUser(userCredentials);
    if (!user) throw new Error("Credenciales inválidas");

    return user;
  },
});
