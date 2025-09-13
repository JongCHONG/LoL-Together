import { AuthResponse, LoginCredentials, RegisterCredentials } from "../types/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {  
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur de connexion");
  }

  return data;
};

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {  
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur d'inscription");
  }

  return data;
};