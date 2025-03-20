import { AuthResponse, Credentials, UserResponse } from "@/types/user";

const backendUrl = process.env.BACKEND_URL || "";
export async function loginUser(credentials: Credentials) {
  try {
    const authResponse = await fetch(`${backendUrl}/token/`, {
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
    
    const tokenData: AuthResponse = await authResponse.json();

    const userResponse = await fetch(`${backendUrl}/users/me/`, {
      headers: {
        "Authorization": `Bearer ${tokenData.access}`,
        "Content-Type": "application/json"
      }
    });
    
    if (!userResponse.ok) {
      return null;
    }
    
    const userData: UserResponse = await userResponse.json();
    
    return {
      id: userData.id,
      userName: userData.username,
      access_token: tokenData.access,
      refresh_token: tokenData.refresh,
      firstName: userData.first_name
    };
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}