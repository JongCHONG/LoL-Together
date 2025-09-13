import { Announce } from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const createAnnounce = async (data: {
  text: string;
  user: string;
  team: string;
}): Promise<Announce> => {  
  try {
    const response = await fetch(`${API_BASE_URL}/api/announces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result: Announce = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateAnnounce = async (
  announceId: string,
  data: { text: string }
): Promise<Announce> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/announces/${announceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result: Announce = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const deleteAnnounce = async (announceId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/announces/${announceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};