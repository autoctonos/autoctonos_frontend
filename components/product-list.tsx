"use client"
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function ProductList({ products }: { products: any[] }) {
  const router = useRouter();

  if (!products || products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {products.map((item) => {
        const imageUrl = decodeURIComponent(item.imagenes[0].url_imagen.replace("/media/", ""));

        return (
          <Card
            key={item.id_producto}
            isPressable
            shadow="sm"
            onPress={() => router.push(`/productos/${item.id_producto}`)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.nombre}
                className="w-full object-cover h-[140px]"
                radius="lg"
                shadow="sm"
                src={imageUrl}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.nombre} </b>
              <p className="text-default-500">{item.precio}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
