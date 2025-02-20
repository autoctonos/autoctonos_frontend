interface Credentials {
  userName: string;
  password: string;
}

export async function loginUser(credentials: Credentials) {
  try {
    const authResponse = await fetch("http://django-docker:8000/api/token/", {
      // TODO: la url va en .env
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    console.log("📌 Enviando login a Django:", { credentials });

    if (!authResponse.ok) {
      console.error("❌ Error en la respuesta de Django:", authResponse.status);
      return null;
    }
    return await authResponse.json();
  } catch (error) {
    console.error("Error en la autenticación:", error);
    console.error("❌ Error en loginUser:", error);
    return null;
  }
}
