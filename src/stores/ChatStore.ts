import { makeAutoObservable, runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatSession } from '../types';
import { apiService } from '../services/apiService';

class ChatStore {
  currentSession: ChatSession = {
    id: uuidv4(),
    messages: []
  };
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadMessages();
  }

  async loadMessages() {
    try {
      this.isLoading = true;
      const messages = await apiService.getChatHistory(this.currentSession.id);
      runInAction(() => {
        this.currentSession.messages = messages;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to load chat history';
        this.isLoading = false;
      });
    }
  }

  async sendMessage(text: string) {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    this.currentSession.messages.push(userMessage);
    this.isLoading = true;

    try {
      const response = await apiService.sendMessage(this.currentSession.id, text);
      
      runInAction(() => {
        const aiMessage: Message = {
          id: uuidv4(),
          text: response,
          sender: 'ai',
          timestamp: new Date()
        };
        this.currentSession.messages.push(aiMessage);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        const errorMessage: Message = {
          id: uuidv4(),
          text: "Sorry, I couldn't process your request. Please try again later.",
          sender: 'ai',
          timestamp: new Date()
        };
        this.currentSession.messages.push(errorMessage);
        this.isLoading = false;
        this.error = 'Failed to get AI response';
      });
    }
  }

  clearChat() {
    this.currentSession = {
      id: uuidv4(),
      messages: []
    };
  }
}

export const chatStore = new ChatStore();