interface Credentials {
  email: string;
  password: string;
}

export async function loginUser(credentials: Credentials) {
  try {
    const authResponse = await fetch("http://127.0.0.1:8000/auth-api/login/", { // TODO: la url va en .env
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!authResponse.ok) return null;
    return await authResponse.json();
  } catch (error) {
    console.error("Error en la autenticación:", error);
    return null;
  }
}
