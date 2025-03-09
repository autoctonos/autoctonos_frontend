"use client";
import { useState } from "react";

export default function ProductPriceAndActions({
  price,
  stock,
  productId,
}: {
  price: number;
  stock: number;
  productId: string;
}) {
  const [quantity, setQuantity] = useState(1);

  const quantityOptions = [];
  for (let i = 1; i <= stock; i++) {
    quantityOptions.push(i);
  }

  const handleAddToCart = () => {
    // Lógica para agregar al carrito
    const newItem = { productId, quantity };
    console.log("Agregado al carrito:", newItem);
  };

  return (
    <div className="flex flex-col items-center justify-center h-4/6 border rounded-3xl gap-1 p-5">
      <p className="text-lg font-semibold">Precio ${price}</p>
      <p className="text-sm text-gray-600">
        Stock disponible: {stock} {stock === 1 ? "unidad" : "unidades"}
      </p>

      <div className="flex items-center gap-2 mt-2">
        <label>Cantidad:</label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="p-1 border rounded"
        >
          {quantityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Agregar al carrito
      </button>
    </div>
  );
}