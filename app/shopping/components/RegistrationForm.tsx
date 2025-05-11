"use client";

import { useState } from "react";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [typeStreet, setTypeStreet] = useState("");
  const [street, setStreet] = useState("");
  const [numberStreet, setNumberStreet] = useState("");
  const [descriptio, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, phone, typeStreet, street, numberStreet, descriptio });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full md:w-2/3 gap-5 border rounded-3xl p-5 shadow-md bg-white"
    >
      <h2 className="text-lg font-semibold">Nombre completo</h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Nombre y apellido</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none"
          required
        />
      </div>

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
          <label className="text-sm font-medium mb-1">Tipo de calle</label>
          <input
            type="text"
            value={typeStreet}
            onChange={(e) => setTypeStreet(e.target.value)}
            placeholder="Calle, Carrera, Av..."
            className="w-full border rounded-lg p-2 focus:outline-none"
            required
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium mb-1">Calle</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="123"
            className="w-full border rounded-lg p-2 focus:outline-none"
            required
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium mb-1">Número</label>
          <input
            type="text"
            value={numberStreet}
            onChange={(e) => setNumberStreet(e.target.value)}
            placeholder="45B"
            className="w-full border rounded-lg p-2 focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">
          Descripción adicional
        </label>
        <textarea
          value={descriptio}
          onChange={(e) => setDescription(e.target.value)}
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
