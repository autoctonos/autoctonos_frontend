"use client"

import { useState } from "react";
import { Input, Button, Form } from "@heroui/react";
import { useAtom } from "jotai";
import { shippingAtom } from "@/atoms/shipping";
import { useCart } from "@/contexts/cart-context";
import Layout from "@/components/layout/layout";

export default function ShippingPage() {
  const [formData, setFormData] = useAtom(shippingAtom);
  const [loading, setLoading] = useState(false);
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5000;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckout = async () => {
    setLoading(true)

    const fullName = `${formData.firstName} ${formData.lastName}`.trim()

    const res = await fetch("/api/payu/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: "Compra en Autóctono",
        referenceCode: `AUTO-${Date.now()}`,
        amount: total,
        email: formData.email,
        name: fullName,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      clearCart();
    }


    const form = document.createElement("form")
    form.method = "POST"
    form.action = data.redirectUrl

    Object.entries(data.params).forEach(([key, value]) => {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = key
      input.value = String(value)
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
  }

  return (
    <Layout>
      <main className="bg-white min-h-screen px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-4">
              <h1 className="text-3xl font-bold text-custom-dark-green">Dirección de envío</h1>
              <p className="text-sm text-gray-700">
                Ingresa los datos para continuar al pago seguro con PayU
              </p>

              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} required />
                  <Input name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} required />
                </div>
                <Input name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input name="zip" placeholder="Código postal" value={formData.zip} onChange={handleChange} required />
                  <Input name="city" placeholder="Ciudad" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input name="country" placeholder="País" value={formData.country} onChange={handleChange} required />
                  <Input name="state" placeholder="Departamento" value={formData.state} onChange={handleChange} />
                </div>
                <Input name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
                <Input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} />

                <Button
                  type="button"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-custom-dark-green hover:bg-custom-medium-green text-white text-base py-3 rounded-full"
                >
                  {loading ? "Redirigiendo a PayU..." : "Ir al pago seguro con PayU"}
                </Button>
              </Form>
            </section>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-custom-dark-green">Resumen</h2>
            <div className="bg-white shadow rounded-lg p-6 space-y-4">
              {cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span>{item.productName} (x{item.quantity})</span>
                <span>${(item.price * item.quantity)}</span>
              </div>
                ))}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Envío</span>
                 <span>${shipping}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
