import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName: string;
      firstName?: string | null;
      email?: string | null;
      image?: string | null;
    }
    access_token?: string;
  }

  interface User {
    id: string;
    firstName?:string
    userName: string;
    access_token?: string;
    refresh_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName: string;
    access_token?: string;
    firstName?: string;
    refresh_token?: string;
  }
}