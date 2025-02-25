"use client"
import {Card, CardBody, CardFooter, Image} from "@heroui/react";
export default function App({ products }: { products: any[] }) {
    console.log(products)

    if (!products || products.length === 0) {
        return <p>No hay productos disponibles.</p>;
      }

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {products.map((item) => (
        <Card key={item.id_producto} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.nombre}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={"hola"}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.nombre}</b>
            <p className="text-default-500">{item.precio}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
