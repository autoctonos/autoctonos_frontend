"use server";
const backendUrl = process.env.BACKEND_URL || "";

export const getProductDetail = async (id: string) => {
  try {
    const response = await fetch(
      `${backendUrl}/productos/producto-detalle/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-store"
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener product-detail.");
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return { success: false, message: errorMessage };
  }
};
