"use server";
const backendUrl = process.env.BACKEND_URL || "";

export const getProducts = async () => {
    try {
        const response = await fetch(`${backendUrl}/productos/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al obtener productos.");
        }
        return { success: true, data };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return { success: false, message: errorMessage };
    }
};
