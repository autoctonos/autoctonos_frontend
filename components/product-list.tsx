"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { useRouter } from "next/navigation";

type ImagenProducto = {
  id_imagen: number;
  id_producto: number;
  url_imagen: string;
  created_at: string;
};

type Product = {
  id_producto: number;
  nombre: string;
  imageUrl?: string;
  precio?: string | number;
};

export default function ProductList({ products }: { products: Product[] }) {
  const router = useRouter();
  const [firstImageByProduct, setFirstImageByProduct] = useState<Record<number, string>>({});

  const withLocalhost = (src?: string) => {
    const s = String(src ?? "").trim();
    if (!s) return "";
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    if (s.startsWith("/media/")) return `http://localhost:8000${s}`;
    if (s.startsWith("media/")) return `http://localhost:8000/${s}`;
    return s;
  };

  useEffect(() => {
    let cancelled = false;
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/productos/imagenes_productos/");
        if (!res.ok) return;
        const data: ImagenProducto[] = await res.json();
        const map: Record<number, string> = {};
        for (const img of data) {
          if (map[img.id_producto]) continue;
          map[img.id_producto] = withLocalhost(img.url_imagen);
        }
        if (!cancelled) setFirstImageByProduct(map);
      } catch {}
    };
    fetchImages();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!products || products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {products.map((item) => {
        const src =
          firstImageByProduct[item.id_producto] ||
          withLocalhost(item.imageUrl) ||
          "https://picsum.photos/640/480";
        return (
          <Card
            key={item.id_producto}
            isPressable
            shadow="sm"
            onPress={() => router.push(`/products/${item.id_producto}`)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.nombre}
                className="w-full object-cover h-[140px]"
                radius="lg"
                shadow="sm"
                src={src}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.nombre}</b>
              <p className="text-default-500">{item.precio}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
