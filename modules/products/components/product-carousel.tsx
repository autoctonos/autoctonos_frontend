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

  const handleImageError = () => {
    setFallbackImage("/respaldo.png");
  };

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    updateButtons();
  }, [emblaApi, updateButtons]);

  return (
    <div className="flex items-center relative w-[500px] sm:w-[1100px]">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((img) => (
            <div className="min-w-full flex justify-center" key={img.id_imagen}>
              <Image
                src={fallbackImage || img.url_imagen}
                alt={productName}
                width={500}
                height={500}
                className="rounded-lg"
                onError={handleImageError}
              />
            </div>
          ))}
        </div>
      </div>

      {canScrollPrev && (
        <button
          className="h-10 w-7 sm:h-8 sm:w-8 absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ArrowLeft size={20} />
        </button>
      )}

      {canScrollNext && (
        <button
          className="h-10 w-7 sm:h-8 sm:w-8 absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ArrowRigth size={20} />
        </button>
      )}
    </div>
  );
}
