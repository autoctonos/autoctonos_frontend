interface Credentials {
  userName: string;
  password: string;
}

export async function loginUser(credentials: Credentials) {
  try {
    console.log("🚀 Intentando autenticar con Django", credentials);

    const authResponse = await fetch("http://django-web:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.userName, // 🔥 CAMBIADO "userName" → "username"
        password: credentials.password,
      }),
    });

    console.log("📌 Respuesta de Django:", authResponse);

    if (!authResponse.ok) {
      console.error("❌ Error en la respuesta de Django:", authResponse.status);
      return null;
    }

    return await authResponse.json();
  } catch (error) {
    console.error("❌ Error en loginUser:", error);
    return null;
  }
}
