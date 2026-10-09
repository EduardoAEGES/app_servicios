export type Tab = "inicio" | "busqueda" | "chat" | "perfil";

export interface Specialist {
  id: number;
  name: string;
  trade: string;
  rating: number;
  reviews: number;
  rate: number;
  location: string;
  experience: number;
  photo: string;
  bio: string;
  skills: string[];
  availability: string;
  jobs: number;
  verified: boolean;
}

export interface Message {
  id: number;
  specialistId: number;
  specialist: string;
  photo: string;
  trade: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: ChatMsg[];
}

export interface ChatMsg {
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}
