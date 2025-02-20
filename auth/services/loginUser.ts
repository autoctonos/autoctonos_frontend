interface Credentials {
  userName: string;
  password: string;
}

export async function loginUser(credentials: Credentials) {
  try {
    const authResponse = await fetch("http://django-web:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.userName,
        password: credentials.password,
      }),
    });

    if (!authResponse.ok) {
      return null;
    }

    return await authResponse.json();
  } catch (error) {
    return null;
  }
}
