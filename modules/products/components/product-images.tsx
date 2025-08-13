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
  }));

  return <ImageCarousel images={decodedImages} productName={productName} />;
}
