import { User } from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.error("Réponse non-JSON:", textResponse);
      throw new Error("Le serveur n'est pas disponible");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la récupération des utilisateurs");
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Impossible de se connecter au serveur");
    }
    throw error;
  }
};

export const fetchUserById = async (userId: string): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.error("Réponse non-JSON:", textResponse);
      throw new Error("Le serveur n'est pas disponible");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la récupération de l'utilisateur");
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Impossible de se connecter au serveur");
    }
    throw error;
  }
};