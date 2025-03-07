"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductTemplate({ product }: { product: any }) {
  const [fallbackImage, setFallbackImage] = useState<string | null>(null);

  const handleImageError = () => {
    setFallbackImage("/respaldo.png");
  };

  return (
    <section className="flex flex-col container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">{product.nombre}</h1>
      <div className="flex flex-grow">
        {product.imagenes?.length > 0 && (
          <div className="flex gap-4 mt-4">
            {product.imagenes.map((img: any) => (
              <Image
                key={img.id_imagen}
                src={fallbackImage || img.url_imagen}
                alt={product.nombre}
                width={800}
                height={800}
                className="rounded-lg"
                onError={handleImageError}
              />
            ))}
          </div>
        )}

        <p className="text-lg font-semibold mt-2">${product.precio}</p>
      </div>
        <p className="text-gray-600">{product.descripcion}</p>
    </section>
  );
}
