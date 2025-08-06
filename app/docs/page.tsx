"use client"
import MainLayout from "@/components/layout/main"
import { Card, CardBody } from "@heroui/card"
import { title, subtitle } from "@/components/primitives";
import { CheckCircle, ShoppingBasket, MapPin, Leaf, HandHeart, Smile } from "lucide-react"
import Image from "next/image"

export default function ComoFunciona() {
    return (
        <MainLayout>
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex flex-col items-center mb-8">
                        <Image
                            src="/logo.svg"
                            alt="Logo Autóctono"
                            width={300}
                            height={300}
                            className="mb-4"
                        />
                        <div className="inline-block max-w-xl text-center justify-center">
                            <span className={title()}>Así funciona&nbsp;</span>
                            <span className={title({ color: "pink" })}>Autóctonos&nbsp;</span>
                            <br />
                            <div className={subtitle({ class: "mt-4" })}>
                               El puente entre la tradición y tu mesa. Así es como llevamos lo local hasta ti.
                            </div>

                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <Card className="shadow-md hover:shadow-xl transition-all duration-300">
                            <CardBody className="flex flex-col items-center text-center p-6">
                                <ShoppingBasket className="w-10 h-10 text-green-600 mb-4" />
                                <h2 className="text-xl font-semibold mb-2">1. Explora productos únicos</h2>
                                <p>Desde vinos hasta queso, descubre lo mejor del país hecho a mano.</p>
                            </CardBody>
                        </Card>

                        <Card className="shadow-md hover:shadow-xl transition-all duration-300">
                            <CardBody className="flex flex-col items-center text-center p-6">
                                <MapPin className="w-10 h-10 text-green-600 mb-4" />
                                <h2 className="text-xl font-semibold mb-2">2. Conecta con productores</h2>
                                <p>Conoce quién está detrás de cada creación y apoya economías locales.</p>
                            </CardBody>
                        </Card>

                        <Card className="shadow-md hover:shadow-xl transition-all duration-300">
                            <CardBody className="flex flex-col items-center text-center p-6">
                                <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
                                <h2 className="text-xl font-semibold mb-2">3. Compra con confianza</h2>
                                <p>Tu pedido llega directamente desde el origen, sin intermediarios.</p>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="mt-20 grid md:grid-cols-3 gap-6">
                        <Card className="bg-green-50 border-none shadow-none">
                            <CardBody className="text-center px-8 py-6">
                                <Leaf className="w-8 h-8 text-green-700 mx-auto mb-3" />
                                <h3 className="text-lg font-medium mb-1">Sostenibilidad</h3>
                                <p className="text-sm text-muted-foreground">
                                    Apoyas prácticas agrícolas respetuosas con el medio ambiente.
                                </p>
                            </CardBody>
                        </Card>

                        <Card className="bg-green-50 border-none shadow-none">
                            <CardBody className="text-center px-8 py-6">
                                <HandHeart className="w-8 h-8 text-green-700 mx-auto mb-3" />
                                <h3 className="text-lg font-medium mb-1">Justicia</h3>
                                <p className="text-sm text-muted-foreground">
                                    Cada peso va al productor. Sin cadenas de distribución opacas.
                                </p>
                            </CardBody>
                        </Card>

                        <Card className="bg-green-50 border-none shadow-none">
                            <CardBody className="text-center px-8 py-6">
                                <Smile className="w-8 h-8 text-green-700 mx-auto mb-3" />
                                <h3 className="text-lg font-medium mb-1">Confianza</h3>
                                <p className="text-sm text-muted-foreground">
                                    Calificaciones reales de otros compradores como tú.
                                </p>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="mt-16">
                        <p className="italic text-muted-foreground">Comprar aquí te hace bien.</p>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
