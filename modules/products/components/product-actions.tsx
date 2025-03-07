"use client";
import { useState } from "react";

export default function ProductPriceAndActions({
  price,
  stock,
}: {
  price: number;
  stock: number; // Stock disponible del producto
}) {
  const [quantity, setQuantity] = useState(1);

  // Generar un array de opciones basado en el stock disponible
  const quantityOptions = [];
  for (let i = 1; i <= stock; i++) {
    quantityOptions.push(i);
  }

  const handleAddToCart = () => {
    // Lógica para agregar al carrito
    console.log("Agregado al carrito:", { quantity });
  };

  return (
    <div className="mt-4">
      {/* Precio */}
      <p className="text-lg font-semibold">${price}</p>

      {/* Stock disponible */}
      <p className="text-sm text-gray-600">
        Stock disponible: {stock} {stock === 1 ? "unidad" : "unidades"}
      </p>

      {/* Cantidad (desplegable) y botón de agregar al carrito */}
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

      {/* Botón de agregar al carrito */}
      <button
        onClick={handleAddToCart}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
