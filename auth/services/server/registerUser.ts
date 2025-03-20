"use server";
import { RegisterFormData } from "@/types/register";

const backendUrl = process.env.BACKEND_URL || "";

export const registerUser = async (formData: RegisterFormData) => {
    try {
        const response = await fetch(`${backendUrl}/users/users/`, {
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
