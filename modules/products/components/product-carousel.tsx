"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRigth } from "@/components/icons";

export default function ImageCarousel({
  images,
  productName,
}: {
  images: any[];
  productName: string;
}) {
  const [fallbackImage, setFallbackImage] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Convierte "/media/..." a "http://localhost:8000/media/..."
  const withLocalhost = (src?: string) => {
    const s = String(src ?? "").trim();
    if (!s) return "";
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    if (s.startsWith("/media/")) return `http://localhost:8000${s}`;
    if (s.startsWith("media/")) return `http://localhost:8000/${s}`;
    return s;
  };

  const handleImageError = () => {
    setFallbackImage("/respaldo.png");
  };

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    updateButtons();
  }, [emblaApi, updateButtons]);

  const handleThumbnailClick = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="flex flex-col items-center w-[500px] sm:w-[1100px]">
      <div className="relative w-full">
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex">
            {images.map((img, index) => (
              <div
                className="min-w-full flex justify-center"
                key={img.id_imagen ?? index}
              >
                <Image
                  src={fallbackImage || withLocalhost(img.url_imagen)}
                  alt={productName}
                  width={500}
                  height={500}
                  className="rounded-lg"
                  onError={handleImageError}
                  unoptimized  // <- evita /_next/image, consulta directo a :8000
                />
              </div>
            ))}
          </div>
        </div>

        {canScrollPrev && (
          <button
            className="h-10 w-7 sm:h-8 sm:w-8 absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-300"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Imagen anterior"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        {canScrollNext && (
          <button
            className="h-10 w-7 sm:h-8 sm:w-8 absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-300"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Imagen siguiente"
          >
            <ArrowRigth size={20} />
          </button>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        {images.map((img, index) => (
          <button
            key={img.id_imagen ?? index}
            className={`border-2 rounded-lg overflow-hidden ${
              selectedIndex === index ? "border-custom-red" : "border-transparent"
            }`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`Miniatura ${index + 1}`}
          >
            <Image
              src={withLocalhost(img.url_imagen)}
              alt={`${productName} thumbnail`}
              width={60}
              height={60}
              className="object-cover w-16 h-16 rounded-lg"
              unoptimized 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
