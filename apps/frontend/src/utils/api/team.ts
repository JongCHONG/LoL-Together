import { Team } from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const createTeam = async (teamData: Team): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/teams/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamData),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.error("Réponse non-JSON:", textResponse);
      throw new Error("Le serveur n'est pas disponible");
    }

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Erreur lors de la création de l'équipe");
    }
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Impossible de se connecter au serveur");
    }
    throw error;
  }
};

export const fetchTeams = async (): Promise<Team[]> => {

  try {
    const response = await fetch(`${API_BASE_URL}/api/teams/list`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Erreur lors de la récupération des équipes");
    }

    const teams: Team[] = await response.json();
    
    return teams;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Impossible de se connecter au serveur");
    }
    throw error;
  }
};