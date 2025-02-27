"use client";
import Layout from "@/components/layout/layout";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      userName,
      password,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Usuario o contraseña incorrectos.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Layout>
      <section className="fixed inset-0 flex justify-center items-center">
        <div className="flex gap-1">
          <Card className="w-full max-w-sm shadow-lg flex justify-center items-center hidden sm:flex">
            <CardHeader className="absolute z-10 top-1 flex-col">
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="login.webp"
            />
          </Card>

          <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
            <Card className="w-full max-w-sm shadow-lg">
              <CardHeader className="text-center">
                <h1 className="text-gray-500 text-sm">
                  Bienvenido a Autóctonos, por favor ingresa tus datos de inicio de sesión.
                </h1>
              </CardHeader>
              <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <Input type="username" placeholder="username" className="border border-gray-300 rounded-md px-3 py-2" value={userName}
                    onChange={(e) => setUserName(e.target.value)} required />
                  <Input type="password" placeholder="contraseña" className="border border-gray-300 rounded-md px-3 py-2" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                  <a href="#" className="text-sm text-right">¿Olvidaste tu contraseña?</a>
                  <Button color="primary" type="submit" isLoading={isLoading} className="w-full">
                    Iniciar sesión
                  </Button>
                </form>

                <div className="text-center my-4 text-gray-500">O</div>

                <Button variant="faded" className="w-full flex items-center justify-center gap-2 py-2">
                  <FcGoogle className="text-lg" />
                  Iniciar sesión con Google
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  ¿No tienes una cuenta? <a href="/register" className="text-primary">Regístrate</a>
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}