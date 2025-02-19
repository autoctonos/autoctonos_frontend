interface Credentials {
  userName: string;
  password: string;
}

export async function loginUser(credentials: Credentials) {
  try {
    const authResponse = await fetch("http://localhost:8000/api/token/", {// TODO: la url va en .env
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
