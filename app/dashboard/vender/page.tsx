"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/layout/dashboard";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Select, SelectItem } from "@heroui/react";
import { createProduct, uploadProductImage } from "@/auth/services/server/products";
import { addToast } from "@heroui/react";

interface ImageUploadProps {
  image: File | null;
  setImage: (file: File | null) => void;
}

interface Categoria {
  id_categoria: number;
  nombre: string;
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

interface FormState {
  id_categoria: number | null;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
}

export default function SellProductPage() {
  const { data: session, status } = useSession();

  const [form, setForm] = useState<FormState>({
    id_categoria: null,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [catLoading, setCatLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session?.user?.id) {
      setForm((prev) => ({ ...prev, id_usuario: Number(session.user.id) }));
    }
  }, [session?.user?.id]);

  useEffect(() => {
    const ac = new AbortController();
    const fetchCategorias = async () => {
      try {
        setCatLoading(true);
        const res = await fetch("http://localhost:8000/api/productos/categorias/", {
          signal: ac.signal,
        });
        if (!res.ok) throw new Error("No se pudieron obtener las categorías");
        const data: Categoria[] = await res.json();
        setCategorias(Array.isArray(data) ? data : []);
      } catch (err) {
        const e = err as { name?: string };
        if (e.name !== "AbortError") {
          addToast({ title: "Error", description: "Error al cargar categorías", color: "danger" });
        }
      } finally {
        setCatLoading(false);
      }
    };
    fetchCategorias();
    return () => ac.abort();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "stock" ? parseInt(value as string, 10) || 0 : (value as string),
    }));
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!session?.user?.id) {
      addToast({ title: "Error", description: "Usuario no autenticado", color: "danger" });
      setLoading(false);
      return;
    }

    if (!form.id_categoria) {
      addToast({ title: "Atención", description: "Selecciona una categoría", color: "warning" });
      setLoading(false);
      return;
    }

    try {
      const productResult = await createProduct({
        id_categoria: Number(form.id_categoria),
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: form.precio,
        stock: form.stock as unknown as string,
      });

      if (!productResult.success || !productResult.data?.id_producto) {
        addToast({
          title: "Error",
          description: productResult.message || "Error al crear el producto",
          color: "danger",
        });
        setLoading(false);
        return;
      }

      if (image) {
        const formDataImg = new FormData();
        formDataImg.append("id_producto", String(productResult.data.id_producto));
        formDataImg.append("url_imagen", image);

        const imgResult = await uploadProductImage(formDataImg);

        if (!imgResult.success) {
          addToast({
            title: "Atención",
            description: "Producto creado pero la imagen no se pudo subir",
            color: "warning",
          });
          setLoading(false);
          return;
        }
      }

      addToast({ title: "Éxito", description: "Producto publicado exitosamente", color: "success" });
      setForm({
        id_categoria: null,
        nombre: "",
        descripcion: "",
        precio: "",
        stock: 0,
      });
      setImage(null);
    } catch {
      addToast({ title: "Error", description: "Error inesperado", color: "danger" });
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
            <Input
              label="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleInputChange}
              required
            />
            <Textarea
              label="Descripción"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
            />
            <Select
              label="Categoría"
              placeholder={catLoading ? "Cargando..." : "Selecciona una categoría"}
              isDisabled={catLoading}
              selectedKeys={form.id_categoria ? new Set([String(form.id_categoria)]) : new Set([])}
              onSelectionChange={(keys: "all" | Set<React.Key>) => {
                const key = Array.from(keys as Set<React.Key>)[0];
                setForm((prev) => ({ ...prev, id_categoria: key ? Number(key) : null }));
              }}
              variant="bordered"
              classNames={{
                trigger: "border-custom-medium-green focus-within:border-custom-dark-green",
              }}
              items={categorias}
            >
              {(cat) => (
                <SelectItem key={String(cat.id_categoria)}>{cat.nombre}</SelectItem>
              )}
            </Select>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <Input
                label="Stock"
                name="stock"
                type="number"
                value={String(form.stock)}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Precio"
                name="precio"
                type="number"
                value={form.precio}
                onChange={handleInputChange}
                required
              />
            </div>

            <ImageUpload image={image} setImage={setImage} />

            <Button type="submit" isDisabled={loading} color="primary">
              {loading ? "Publicando..." : "Publicar Producto"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
