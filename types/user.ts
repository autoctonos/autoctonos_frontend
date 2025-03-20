export type Credentials = {
    userName: string;
    password: string;
  }
  
export type AuthResponse = {
    access: string;
    refresh: string;
  }
  
export type UserResponse = {
    id: string;
    username: string;
    first_name: string
  }
  