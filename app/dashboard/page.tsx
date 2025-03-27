"use client"
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/layout/dashboard";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Card, CardBody, Chip, Tab, Tabs } from "@heroui/react";

export default function DashboardPage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
            <Breadcrumbs className="mb-5">
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Guía de Uso</BreadcrumbItem>
            </Breadcrumbs>
                <h1 className="text-3xl font-bold mb-6">Guía de Uso del Dashboard</h1>
                <p className="text-gray-600 mb-8">
                    Bienvenido {session?.user.firstName}, esta guía te ayudará a entender cómo utilizar las diferentes secciones de tu dashboard.
                </p>

                <Tabs>
                    <Tab title="Visión General">
                        <Card>
                            <CardBody className="p-6">
                                <h2 className="text-2xl font-semibold mb-4">¿Qué puedes hacer en este dashboard?</h2>
                                <p className="mb-4">
                                    Este dashboard te permite gestionar tus productos y revisar el estado de tus solicitudes. Las principales secciones son:
                                </p>
                                <ul className="list-disc pl-6 mb-6 space-y-2">
                                    <li><strong>Solicitudes:</strong> Revisa el estado de los productos que has sometido para aprobación.</li>
                                    <li><strong>Vender:</strong> Sube nuevos productos para vender en nuestra plataforma.</li>
                                </ul>
                                <p>
                                    Navega entre las pestañas de esta guía para obtener instrucciones detalladas sobre cada sección.
                                </p>
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab title="Solicitudes">
                        <Card>
                            <CardBody className="p-6">
                                <h2 className="text-2xl font-semibold mb-4">Página de Solicitudes</h2>
                                <p className="mb-6">
                                    En esta página puedes ver todas tus solicitudes de productos y su estado actual.
                                </p>

                                <h3 className="text-xl font-medium mb-3">Estados de solicitud</h3>
                                <div className="mb-6 flex gap-4">
                                    <Chip color="success" className="mb-2">Aprobado</Chip>
                                    <Chip color="danger" className="mb-2">Rechazado</Chip>
                                    <Chip color="warning" className="mb-2">Revisión</Chip>
                                </div>

                                <h3 className="text-xl font-medium mb-3">¿Cómo interpretar los estados?</h3>
                                <ul className="list-disc pl-6 mb-6 space-y-3">
                                    <li>
                                        <strong>Aprobado:</strong> Tu producto ha sido revisado y aceptado. Ya está disponible para venta en la plataforma.
                                    </li>
                                    <li>
                                        <strong>Rechazado:</strong> Tu producto no cumple con nuestros criterios. Junto al estado, encontrarás una explicación detallada del motivo del rechazo.
                                    </li>
                                    <li>
                                        <strong>Revisión:</strong> Tu producto se encuentra en revisión.
                                    </li>
                                </ul>

                                <h3 className="text-xl font-medium mb-3">Ejemplo de visualización</h3>
                                <div className="border rounded-lg p-4 mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="font-medium">Almohabana</h4>
                                            <p className="text-sm text-gray-500">Subido el: 15/03/2025</p>
                                        </div>
                                        <Chip color="success">Aprobado</Chip>
                                    </div>
                                    <p className="text-sm">
                                        Comentario: Producto aprobado, cumple con todos los requisitos de calidad.
                                    </p>
                                </div>

                                <div className="border rounded-lg p-4 mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="font-medium">Vino</h4>
                                            <p className="text-sm text-gray-500">Subido el: 12/03/2025</p>
                                        </div>
                                        <Chip color="danger">Rechazado</Chip>
                                    </div>
                                    <p className="text-sm">
                                        Motivo: Las imágenes no muestran claramente el producto. Por favor, sube fotos de mejor calidad que muestren el producto desde diferentes ángulos.
                                    </p>
                                </div>

                                 <div className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="font-medium">Queso</h4>
                                            <p className="text-sm text-gray-500">Subido el: 01/04/2025</p>
                                        </div>
                                        <Chip color="warning">Revisión</Chip>
                                    </div>
                                    <p className="text-sm">
                                        Comentario: Tu producto se encuentra en revisión.
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab title="Vender">
                        <Card>
                            <CardBody className="p-6">
                                <h2 className="text-2xl font-semibold mb-4">Página de Vender</h2>
                                <p className="mb-6">
                                    Aquí puedes subir nuevos productos para vender en nuestra plataforma. Completa todos los campos requeridos para enviar tu solicitud.
                                </p>

                                <h3 className="text-xl font-medium mb-3">Campos del formulario</h3>
                                <ul className="list-disc pl-6 mb-6 space-y-3">
                                    <li>
                                        <strong>Nombre:</strong> Título descriptivo y conciso para tu producto.
                                    </li>
                                    <li>
                                        <strong>Descripción:</strong> Información detallada sobre características, materiales, tamaño, etc. Sé específico para aumentar las posibilidades de aprobación.
                                    </li>
                                    <li>
                                        <strong>Stock:</strong> Cantidad disponible del producto.
                                    </li>
                                    <li>
                                        <strong>Imágenes:</strong> Fotos de alta calidad del producto. Recomendamos subir al menos 3 imágenes desde diferentes ángulos.
                                    </li>
                                </ul>

                                <h3 className="text-xl font-medium mb-3">Consejos para la aprobación rápida</h3>
                                <ul className="list-disc pl-6 mb-6 space-y-2">
                                    <li>Usa imágenes nítidas con buena iluminación.</li>
                                    <li>Proporciona descripciones detalladas y precisas.</li>
                                    <li>Verifica que el stock indicado sea correcto.</li>
                                    <li>Asegúrate que tu producto cumpla con nuestras políticas de venta.</li>
                                </ul>

                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-700">
                                        <strong>Nota:</strong> Una vez enviado el formulario, tu producto pasará a revisión. Puedes verificar el estado en la página de "Solicitudes".
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}