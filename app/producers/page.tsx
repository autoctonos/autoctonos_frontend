"use client"
import MainLayout from "@/components/layout/main"
import { title, subtitle } from "@/components/primitives"
import Image from "next/image"

export default function NuestrosProductores() {
  return (
    <MainLayout>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Image
            src="/logo.svg"
            alt="Logo Autóctono"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
          <div className="inline-block max-w-xl text-center justify-center mb-12">
            <span className={title()}>Nuestros&nbsp;</span>
            <span className={title({ color: "pink" })}>Productores</span>
            <div className={subtitle({ class: "mt-4" })}>
              Conoce a las personas que preservan nuestras tradiciones y sabores locales.
            </div>
          </div>
          <div className="mt-16">
            <p className="italic text-muted-foreground">Comprar aquí es apoyar a personas reales.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
