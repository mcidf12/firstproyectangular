
export interface LoginRequest{
    email: string,
    password: string
}

export interface RegisterRequest {
  name: string;
  last_name?: string; // opcional
  email: string;
  password: string;
}

