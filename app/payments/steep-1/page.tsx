"use client";
import PaymentsLayout from "@/components/layout/payment-gateway";
import SideBarPayments from "@/components/payment_gateway/side-bar";
import { Card, CardBody } from "@heroui/react";
import { Button } from "@heroui/button";
import LabelInputPayment from "@/components/common/label-input-payment";

export default function DashboardPage() {

    return (
        <PaymentsLayout>
            <div className="flex justify-center items-start h-auto p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-5xl">
                    <section className="flex justify-center items-center">
                        <Card className="w-full max-w-md shadow-lg">
                            <CardBody>
                                <form className="flex flex-col gap-3">
                                    <LabelInputPayment
                                        label="Nombre completo (nombre y apellido)"
                                        name="full_name"
                                        placeholder="ej: Joseph"
                                        value=""
                                        required
                                    />
                                    <LabelInputPayment
                                        label="Número de teléfono"
                                        name="number_phone"
                                        placeholder="ej: 311"
                                        value=""
                                    />
                                    <section className="flex flex-nowrap p-5 border rounded-3xl shadow-md bg-white gap-5">
                                        <div className="w-1/3">
                                            <LabelInputPayment
                                                label="Tipo de calle"
                                                name="type_street"
                                                placeholder=""
                                                value=""
                                                required
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <LabelInputPayment
                                                label="Calle"
                                                name="street"
                                                placeholder=""
                                                value=""
                                                required
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <LabelInputPayment
                                                label="Número"
                                                name="number_street"
                                                placeholder="#"
                                                value=""
                                                required
                                            />
                                        </div>
                                    </section>
                                    <LabelInputPayment
                                        label="Descripción adicional"
                                        name="optional_description"
                                        placeholder="Piso/Departamento (opcional"
                                        value=""
                                        required
                                    />
                                    <Button className="w-full mt-3 rounded-lg py-3 shadow-md" color="primary">
                                        Continuar
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </section>
                    <div className="justify-self-end overflow-y-auto max-h-screen">
                        <SideBarPayments />
                    </div>
                </div>
            </div>

        </PaymentsLayout>
    );
}