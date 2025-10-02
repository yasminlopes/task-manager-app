export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  cpf: string;
  name: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    accessToken: string;
    csrfToken: string;
  };
}

export interface AuthTokens {
  accessToken: string;
  csrfToken: string;
}