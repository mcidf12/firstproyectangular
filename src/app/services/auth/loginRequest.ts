
export interface LoginRequest{
    email: string,
    password: string
}

export interface RegisterRequest {
  cliente: string;
  email: string;
  password: string;
}

export interface RecoverRequest {
  email: string;
}
