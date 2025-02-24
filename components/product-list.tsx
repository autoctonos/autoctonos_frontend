"use client"
import {Card, CardBody, CardFooter, Image} from "@heroui/react";
export default function App({ products }: { products: any[] }) {
    console.log(products)

    if (!products || products.length === 0) {
        return <p>No hay productos disponibles.</p>;
      }
    
  const list = [
    {
      title: "Orange",
      img: "login.webp",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "login.webp",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "login.webp",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "login.webp",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "login.webp",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "login.webp",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "login.webp",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "login.webp",
      price: "$12.20",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
