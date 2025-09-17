"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useFetchData } from "@/auth/services/client/category";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

type Category = { id_categoria: number | string; nombre: string };
type UseFetchReturn<T> = { data: T | null | undefined; error?: { message?: string } | null; isLoading: boolean };

export default function Drop({ title }: { title: string }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { data, error, isLoading } = useFetchData("productos/categorias") as unknown as UseFetchReturn<Category[]>;
  const categories = (data ?? []) as Category[];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <p>Cargando categorías...</p>;
  if (isLoading) return <p>Cargando categorías...</p>;
  if (error) return <p>Error al cargar: {error?.message ?? "Error"}</p>;
  if (categories.length === 0) return <p>No hay categorías</p>;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="text-medium" variant="light">{title}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Selecciona una categoría" onAction={(key: React.Key) => key && router.push(`/categories/${key}`)}>
        {categories.map((item) => (
          <DropdownItem key={String(item.id_categoria)} id={String(item.id_categoria)}>
            {item.nombre}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
