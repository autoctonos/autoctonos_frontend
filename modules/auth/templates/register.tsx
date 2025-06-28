"use client";
import Layout from "@/components/layout/layout";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Divider } from "@heroui/divider";
import { Progress } from "@heroui/progress";
import LabelInput from "@/components/common/label-input";
import { registerUser } from "@/auth/services/server/registerUser";

export default function LoginPage() {

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        second_name: "",
        last_name: "",
        second_last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        phone: "",
        address: ""
    });

    const [steep , setSteep ] = useState(1);
    const [error, setError] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        for (const key in formData) {
            if (formData[key as keyof typeof formData] === "" && key !== "second_name") {
                setError("Por favor completa todos los campos obligatorios.");
                setIsLoading(false);
                return;
            }
        }

        if (formData.password !== formData.confirm_password) {
            setError("Las contraseñas no coinciden.");
            setIsLoading(false);
            return;
        }

       const result = await registerUser(formData);

        if (!result.success) {
            setError(result?.message || "Ocurrió un error inesperado.");
        } else {
            router.push("/");
        }
        setIsLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Layout>
            <section className="fixed inset-0 flex justify-center items-center">
                <div className="flex gap-1">
                    <div>
                        <Card className="w-full max-w-md shadow-lg">
                            <CardBody>
                                <CardHeader className="text-center">
                                    <h1 className="text-sm">
                                        Bienvenido a Autóctonos, por favor ingresa tus datos para crear tu cuenta.
                                    </h1>
                                </CardHeader>
                                {steep === 1 ? (
                                    <form className="flex flex-col gap-3">
                                        <LabelInput
                                            label="Primer Nombre"
                                            name="first_name"
                                            placeholder="Primer Nombre"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <LabelInput
                                            label="Segundo Nombre (Opcional)"
                                            name="second_name"
                                            placeholder="Segundo Nombre"
                                            value={formData.second_name}
                                            onChange={handleChange}
                                        />
                                        <LabelInput
                                            label="Apellido"
                                            name="last_name"
                                            placeholder="Apellido"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <LabelInput
                                            label="Segundo Apellido"
                                            name="second_last_name"
                                            placeholder="Segundo Apellido"
                                            value={formData.second_last_name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <LabelInput
                                            label="Correo Electrónico"
                                            type="email"
                                            name="email"
                                            placeholder="Correo Electrónico"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />

                                        <Button onPress={() => setSteep(2)} className="w-full mt-3 rounded-lg py-3 shadow-md bg-custom-red text-white">
                                            Siguiente
                                        </Button>
                                        <div className="text-center my-4 text-gray-500">O</div>
                                        <Button variant="faded" className="w-full flex items-center justify-center gap-2 py-2">
                                            <FcGoogle className="text-lg" />
                                            Registrarse con Google
                                        </Button>
                                        <Progress color="danger" aria-label="Loading..." className="max-w-md" size="sm" value={50} />
                                    </form>
                                ) : (
                                    <form className="flex flex-col gap-3" onSubmit={handleRegisterSubmit}>
                                        <LabelInput
                                            label="Nombre de usuario"
                                            name="username"
                                            placeholder="Nombre de usuario"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                        <LabelInput
                                            label="Teléfono"
                                            name="phone"
                                            placeholder="Teléfono"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                        <LabelInput
                                            label="Dirección"
                                            name="address"
                                            placeholder="Dirección"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                        <LabelInput
                                            label="Contraseña"
                                            type="password"
                                            name="password"
                                            placeholder="Contraseña"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <LabelInput
                                            label="Confirmar Contraseña"
                                            type="password"
                                            name="confirm_password"
                                            placeholder="Confirmar Contraseña"
                                            value={formData.confirm_password}
                                            onChange={handleChange}
                                            required
                                        />
                                        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                                        <div className="flex flex-col gap-3 justify-between">
                                            <Button onPress={() => setSteep(1)} className="rounded-lg py-3 shadow-md">
                                                Atrás
                                            </Button>
                                            <Divider />
                                            <Button type="submit" isLoading={isLoading} className="w-full bg-custom-red text-white">
                                                Registrarse
                                            </Button>
                                            <Progress color="danger" aria-label="Loading..." className="max-w-md" size="sm" value={90} />
                                        </div>
                                    </form>
                                )}
                                <p className="text-center text-sm text-gray-500 mt-4">
                                    ¿Ya tienes una cuenta? <a href="/login" className="text-custom-red">Inicia sesión</a>
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                    <Card className="max-w-sm shadow-lg hidden sm:flex">
                        <Image
                            removeWrapper
                            alt="Card background"
                            className="z-0 w-full h-full object-cover"
                            src="https://asisomos.co/wp-content/uploads/2023/08/tienda-virtual-exitosa.jpg"
                        />
                    </Card>
                </div>
            </section>
        </Layout>
    );
}
