"use client";
import { useState } from "react";
import { useCart } from "../../../app/contexts/CartContext";

export default function ProductPriceAndActions({
  price,
  stock,
  productId,
  productName,
}: {
  price: number;
  stock: number;
  productId: string;
  productName: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const quantityOptions = [];
  for (let i = 1; i <= stock; i++) {
    quantityOptions.push(i);
  }

  const handleAddToCart = () => {
    const newItem = { productId, quantity, price, productName};
    addToCart(newItem);
  };

  return (
    <div className="flex flex-col items-center justify-center h-4/6 border border-gray-500 rounded-3xl gap-1 p-5">
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
        className="mt-2 px-4 py-2 bg-custom-red text-white rounded hover:bg-custom-dark-green"
      >
        Agregar al carrito
      </button>
    </div>
  );
}