"use client";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/layout/dashboard";
import ProductosTable from "@/components/dashboard/products-user";
import { useFetchDataById } from "@/auth/services/client/products";

export default function SolicitudesPage() {
    const { data: session, status } = useSession();

    const userId = parseInt(session?.user?.id ?? "0");
    console.log(userId)
    const { data, error, isLoading } = useFetchDataById("productos/posts/", userId);

    if (status === "loading" || isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <DashboardLayout>
            <ProductosTable data={data} />
        </DashboardLayout>
    );
}
