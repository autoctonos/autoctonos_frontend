"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/layout/dashboard";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { createPost, uploadProductImage } from "@/auth/services/server/products";
import { addToast } from "@heroui/react";

interface ImageUploadProps {
  image: File | null;
  setImage: (file: File | null) => void;
}

function ImageUpload({ image, setImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="flex flex-col items-center space-y-2">
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-md border"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            aria-label="Remove image"
            onClick={() => setImage(null)}
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="w-48 h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md text-gray-400">
          No hay imagen seleccionada
        </div>
      )}
      <label
        htmlFor="imageUploadInput"
        className="cursor-pointer inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
      >
        {preview ? "Cambiar imagen" : "Seleccionar imagen"}
      </label>
      <input
        id="imageUploadInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}

export default function SellProductPage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    id_usuario: session?.user?.id ?? 1,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: 0,
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "stock" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!session?.user?.id) {
      addToast({ title: "Error", message: "Usuario no autenticado", color: "danger" });
      setLoading(false);
      return;
    }

    try {
      const postResult = await createPost({
        id_usuario: form.id_usuario,
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: form.precio,
        stock: form.stock,
      });

      if (!postResult.success || !postResult.data?.id_post) {
        addToast({
          title: "Error",
          message: postResult.message || "Error al crear el producto",
          color: "danger",
        });
        setLoading(false);
        return;
      }

      if (image) {
        const formDataImg = new FormData();
        formDataImg.append("id_post", postResult.data.id_post);
        formDataImg.append("url_imagen", image);

        const imgResult = await uploadProductImage(formDataImg);

        if (!imgResult.success) {
          addToast({
            title: "Atención",
            message: "Producto creado pero la imagen no se pudo subir",
            color: "warning",
          });
          setLoading(false);
          return;
        }
      }

      // Éxito total
      addToast({ title: "Éxito", message: "Producto publicado exitosamente", color: "success" });
      setForm({ id_usuario: session.user.id, nombre: "", descripcion: "", precio: "", stock: 0 });
      setImage(null);
    } catch (error) {
      addToast({ title: "Error", message: "Error inesperado", color: "danger" });
    }

    setLoading(false);
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
            
            <ImageUpload image={image} setImage={setImage} />

            <Button type="submit" disabled={loading}>
              {loading ? "Publicando..." : "Publicar Producto"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
