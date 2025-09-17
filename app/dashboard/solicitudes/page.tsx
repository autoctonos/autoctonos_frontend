"use client";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/layout/dashboard";
import ProductosTable from "@/components/dashboard/products-user";
import { useFetchDataById } from "@/auth/services/client/products";

export default function SolicitudesPage() {
    const { status } = useSession();
    const { data, error, isLoading } = useFetchDataById("productos/productos/");

    if (status === "loading" || isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <DashboardLayout>
            <ProductosTable data={data} />
        </DashboardLayout>
    );
}
