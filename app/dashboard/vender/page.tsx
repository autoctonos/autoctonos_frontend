"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/layout/dashboard";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { createPost } from "@/auth/services/server/products";

export default function SellProductPage() {
    const { data: session, status } = useSession();
    const [form, setForm] = useState({
        id_usuario: session?.user?.id ?? 0,
        nombre: "",
        descripcion: "",
        precio:"",
        stock: 0,
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        const value = e.target.name === "stock" ? parseInt(e.target.value, 10) || 0 : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!session?.user?.id) {
            setMessage("Error: Usuario no autenticado");
            setLoading(false);
            return;
        }

        const payload = {
            id_usuario: form.id_usuario,
            nombre: form.nombre,
            descripcion: form.descripcion,
            precio : form.precio,
            stock: form.stock,
        };

        const result = await createPost(payload);
        setLoading(false);

        if (result.success) {
            setMessage("Producto publicado exitosamente");
            setForm({ id_usuario: session.user.id, nombre: "", descripcion: "", precio: "", stock: 0 });
        } else {
            setMessage(result.message);
        }
    };

    return (
        <DashboardLayout>
            <Breadcrumbs className="mb-5">
                <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Vender</BreadcrumbItem>
            </Breadcrumbs>
            <Card>
                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
                        <Textarea label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} required />
                        <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} required />
                        <Input label="Precio" name="precio" type="number" value={form.precio} onChange={handleChange} required />
                        <Button type="submit" disabled={loading}>{loading ? "Publicando..." : "Publicar Producto"}</Button>
                    </form>
                    {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
                </CardBody>
            </Card>
        </DashboardLayout>
    );
}