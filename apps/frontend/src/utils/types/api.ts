import { Types } from "mongoose";

export interface Availabilities {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface roles {
  TOP: boolean;
  JUNGLE: boolean;
  MID: boolean;
  ADC: boolean;
  SUPPORT: boolean;
}

export interface RiotInfos {
  profileIconId: number;
  tier?: string;
  rank?: string;
  wins?: number;
  losses?: number;
  summonerLevel?: number;
  queueType?: string;
  gameEndTimestamp?: number;
  leaguePoints?: number;
  veteran?: boolean;
  inactive?: boolean;
  freshBlood?: boolean;
  hotStreak?: boolean;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  summonerName?: string;
  region?: string;
  languages?: string[];
  availabilities?: Availabilities;
  announces?: Announce[];
  roles?: roles;
  teams?: Team[];
  riot_infos?: RiotInfos;
  riot_id?: string;
  tagline?: string;
  discord?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  _id?: string;
  leader?: { _id: string; riot_id: string };
  name?: string;
  website?: string;
  description?: string;
  discord?: string;
  languages?: string[];
  availabilities?: Availabilities;
  logo?: string;
  status?: string;
  users?: Types.ObjectId[];
  createdAt?: string;
  region?: string[];
  announces?: Announce[];
}

export interface Announce {
  _id: string;
  user?: Types.ObjectId;
  text: string;
  team?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
