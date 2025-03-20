"use client"
import React from "react";
import { Card, Chip, Image, Divider } from "@heroui/react";

interface Producto {
    nombre: string;
    created_at: string | number | Date;
    estado: "Aprobado" | "Rechazado" | "Revisión";
    descripcion: string;
    stock: number;
    mensaje?: string;
}

interface ProductosCardsProps {
    data: Producto[];
}

const statusColorMap: Record<Producto["estado"], "success" | "danger" | "warning"> = {
    Aprobado: "success",
    Rechazado: "danger",
    Revisión: "warning"
};

const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
};

export default function ProductosCards({ data: productos }: ProductosCardsProps) {
    console.log(productos);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productos.map((producto, index) => (
                <Card key={index} className="border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h4 className="font-medium">{producto.nombre}</h4>
                            <p className="text-sm text-gray-500">Subido el: {formatDate(producto.created_at)}</p>
                        </div>
                        <Chip color={statusColorMap[producto.estado]}>{producto.estado}</Chip>
                    </div>

                    <div className="flex justify-center mb-3">
                        {/* TODO: IMAGE HANDLING */}
                        <Image
                            src="https://picsum.photos/1280/720"
                            alt={producto.nombre}
                            height={200}
                            width={400}
                            className="w-full h-40 object-cover rounded-md"
                        />
                    </div>

                    <div className="mb-3">
                        <p className="text-sm mb-2">{producto.descripcion}</p>
                        <p className="text-sm font-medium">Stock disponible: {producto.stock} unidades</p>
                    </div>

                    <Divider className="border-t mt-2 mb-2" />
                    <p className="text-sm">
                        <span className="font-medium">Comentario:</span> {producto.mensaje || "Sin comentarios adicionales."}
                    </p>
                </Card>
            ))}
        </div>
    );
}
