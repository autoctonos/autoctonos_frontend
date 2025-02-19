import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../services/loginUser";

interface Credentials {
  userName: string;
  password: string;
}

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    userName: { label: "Nombre de usuario", type: "text", placeholder: "Nombre" },
    password: { label: "Contraseña", type: "password" },
  },
  async authorize(credentials: Record<string, unknown>): Promise<any> {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Email y contraseña son obligatorios");
    }

    const userCredentials: Credentials = {
      userName: String(credentials.userName),
      password: String(credentials.password),
    };

    const user = await loginUser(userCredentials);
    if (!user) throw new Error("Credenciales inválidas");

    return user;
  },
});
