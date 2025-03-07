"use client";
import { useState } from "react";

export default function ProductPriceAndActions({
  price,
  stock,
}: {
  price: number;
  stock: number;
}) {
  const [quantity, setQuantity] = useState(1);

  const quantityOptions = [];
  for (let i = 1; i <= stock; i++) {
    quantityOptions.push(i);
  }

  const handleAddToCart = () => {
    // Logica para agregar al carrito
    console.log("Agregado al carrito:", { quantity });
  };

  return (
    <div className="mt-4">
      <p className="text-lg font-semibold">${price}</p>

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
