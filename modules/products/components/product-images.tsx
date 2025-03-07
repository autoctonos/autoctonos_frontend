"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductImages({
  images,
  productName,
}: {
  images: any[];
  productName: string;
}) {
  const [fallbackImage, setFallbackImage] = useState<string | null>(null);

  const handleImageError = () => {
    setFallbackImage("/respaldo.png");
  };

  return (
    <div className="flex items-center justify-center w-full h-full gap-4 mt-4 border">
      {images.map((img) => (
        <Image
          key={img.id_imagen}
          src={fallbackImage || img.url_imagen}
          alt={productName}
          width={800}
          height={800}
          className="rounded-lg"
          onError={handleImageError}
        />
      ))}
    </div>
  );
}
