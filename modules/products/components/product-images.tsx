"use client";

import ImageCarousel from "./product-carousel";

export default function ProductImages({
  images,
  productName,
}: {
  images: any[];
  productName: string;
}) {
  const decodedImages = images.map((img) => ({
    ...img,
    url_imagen: decodeURIComponent(img.url_imagen.replace(/^\/media\//, "")),
  }));

  return <ImageCarousel images={decodedImages} productName={productName} />;
}
