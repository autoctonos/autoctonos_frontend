import Layout from "@/components/layout/layout"
import { Card, CardHeader, CardBody } from "@heroui/card"
import { Button } from "@heroui/button"
import Link from "next/link"

export default function ConfirmationPage() {
  return (
    <Layout>
        <Card className="w-full max-w-lg shadow-xl bg-white rounded-xl text-center">
          <CardHeader>
            <h2 className="text-2xl font-bold text-custom-dark-green">
              ¡Gracias por tu compra!
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <p className="text-lg text-custom-black">
              Tu pedido ha sido recibido y está en camino. Pronto recibirás una confirmación por correo.
            </p>
            <Link href="/">
              <Button className="bg-custom-dark-green hover:bg-custom-medium-green text-white rounded-full">
                Volver a la tienda
              </Button>
            </Link>
          </CardBody>
        </Card>
    </Layout>
  )
}
