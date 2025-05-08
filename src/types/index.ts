export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: Message[];
}

export interface Document {
  id: string;
  title: string;
  content: string;
  fileType: string;
  uploadDate: Date;
}

export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}