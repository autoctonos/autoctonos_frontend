"use server";
import { ProductFormData } from "@/types/products";

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

export const createProduct = async (formData: ProductFormData) => {
    try {
        const response = await fetch(`${backendUrl}/productos/productos/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al registrar usuario.");
        }

        return { success: true, data };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return { success: false, message: errorMessage };
    }
};


export const uploadProductImage = async (formData: FormData) => {
    try {
        const response = await fetch(`${backendUrl}/productos/imagenes_productos/`, {
            method: "POST",
            body: formData, 
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al subir imagen del producto.");
        }

        return { success: true, data };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return { success: false, message: errorMessage };
    }
};