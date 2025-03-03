"use client";

import { useFetchData } from "@/auth/services/client/category";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Drop({ title }: { title: string }) {
  const { data: categories = [], error, isLoading } = useFetchData("productos/categorias");
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <p>Cargando categorías...</p>;
  if (isLoading) return <p>Cargando categorías...</p>;
  if (error) return <p>Error al cargar: {error.message}</p>;
  if (categories.length === 0) return <p>No hay categorías</p>;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="text-medium" variant="light">{title}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Selecciona una categoría" onAction={(key) => key && router.push(`/categorias/${key}`)}>
        {categories.map((item) => (
          <DropdownItem key={item.id_categoria} id={String(item.id_categoria)}>
            {item.nombre}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
