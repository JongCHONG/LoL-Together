export interface User {
  id: string;
  username: string;
  email: string;
  summonerName?: string;
  region?: string;
  riot_infos: {
    profileIconId: number;
    tier?: string;
    rank?: string;
    wins?: number;
    losses?: number;
  };
  riot_id: string;
  tagline: string;
  discord?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: User[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  authorId: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  name?: string;
  participants: User[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Announce {
  id: string;
  title: string;
  content: string;
  authorId: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
