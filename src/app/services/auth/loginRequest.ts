
export interface LoginRequest{
    email: string,
    password: string
}

export interface RegisterRequest {
  //name: string;
  //last_name?: string;
  cliente: string;
  email: string;
  password: string;
}

export interface RecoverRequest {
  email: string;
}
