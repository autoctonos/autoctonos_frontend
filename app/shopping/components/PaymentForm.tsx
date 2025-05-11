"use client";

import { useState } from "react";

export default function PaymentForm() {
  const [method, setMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // aquí tu lógica de “continuar”
    console.log({ method, phone, street, number, notes });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full md:w-2/3 gap-5 border rounded-3xl p-5 shadow-md bg-white"
    >
      <h2 className="text-lg font-semibold">Elige cómo pagar</h2>

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full border rounded-lg p-2 focus:outline-none"
        required
      >
        <option value="" disabled>
          Selecciona método
        </option>
        <option value="tarjeta">Tarjeta de crédito</option>
        <option value="efectivo">Efectivo</option>
        <option value="transferencia">Transferencia</option>
      </select>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Número de teléfono</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+57 300 0000000"
          className="w-full border rounded-lg p-2 focus:outline-none"
          required
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium mb-1">Calle</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Calle 123"
            className="w-full border rounded-lg p-2 focus:outline-none"
            required
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium mb-1">Número</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="45B"
            className="w-full border rounded-lg p-2 focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Descripción adicional</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Piso/Apartamento (opcional)"
          className="w-full border rounded-lg p-2 focus:outline-none h-20"
        />
      </div>

      <button
        type="submit"
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
      >
        Continuar
      </button>
    </form>
  );
}
