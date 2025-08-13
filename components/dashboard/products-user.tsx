"use client";
import React, { useEffect, useState } from "react";
import { Card, Chip, Image, Divider } from "@heroui/react";

interface Producto {
  id_producto: number;
  nombre: string;
  created_at: string | number | Date;
  estado: "Aprobado" | "Rechazado" | "Revisión";
  descripcion: string;
  stock: number;
  mensaje?: string;
}

interface ImagenProducto {
  id_imagen: number;
  id_producto: number;
  url_imagen: string;
  created_at: string;
}

interface ProductosCardsProps {
  data: Producto[];
}

const statusColorMap: Record<Producto["estado"], "success" | "danger" | "warning"> = {
  Aprobado: "success",
  Rechazado: "danger",
  Revisión: "warning",
};

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const withLocalhost = (src?: string) => {
  const s = String(src ?? "").trim();
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/media/")) return `http://localhost:8001${s}`;
  if (s.startsWith("media/")) return `http://localhost:8001/${s}`;
  return s;
};

export default function ProductosCards({ data: productos }: ProductosCardsProps) {
  const [imagenesMap, setImagenesMap] = useState<Record<number, string[]>>({});

  useEffect(() => {
    async function fetchImagenes() {
      try {
        const res = await fetch("http://37.27.11.226:8001/api/productos/imagenes_productos/");
        if (!res.ok) throw new Error("Failed to fetch images");
        const data: ImagenProducto[] = await res.json();
        const map: Record<number, string[]> = {};
        data.forEach(({ id_producto, url_imagen }) => {
          if (!map[id_producto]) map[id_producto] = [];
          map[id_producto].push(withLocalhost(url_imagen));
        });
        setImagenesMap(map);
      } catch {}
    }
    fetchImagenes();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productos.map((producto) => {
        const imagenes = imagenesMap[producto.id_producto] || [];
        const imagenSrc = imagenes.length > 0 ? imagenes[0] : "https://picsum.photos/1280/720";
        return (
          <Card key={producto.id_producto} className="border rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium">{producto.nombre}</h4>
                <p className="text-sm text-gray-500">Subido el: {formatDate(producto.created_at)}</p>
              </div>
              <Chip color={statusColorMap[producto.estado]}>{producto.estado}</Chip>
            </div>
            <div className="flex justify-center mb-3">
              <Image
                src={imagenSrc}
                alt={producto.nombre}
                height={200}
                width={400}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
            <div className="mb-3">
              <p className="text-sm mb-2">{producto.descripcion}</p>
              <p className="text-sm font-medium">Stock disponible: {producto.stock} unidades</p>
            </div>
            <Divider className="border-t mt-2 mb-2" />
            <p className="text-sm">
              <span className="font-medium">Comentario:</span> {producto.mensaje || "Sin comentarios adicionales."}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
