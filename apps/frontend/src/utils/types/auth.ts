export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  riot_id: string;
  tagline: string;
}

export interface AuthResponse {
  token: string;
}

export interface DecodedToken {
  userId: string;
  email: string;
  exp: number;
  iat: number;
}
