import axios from 'axios';
import { Message, Document, User } from '../types';

// In a real app, this would be from environment variables
const API_URL = 'http://localhost:3001/api';

// Mock implementation for front-end development
// In a real app, these would make actual API calls
export const apiService = {
  // Chat related API calls
  async getChatHistory(sessionId: string): Promise<Message[]> {
    // Mock implementation
    return [];
  },

  async sendMessage(sessionId: string, text: string): Promise<string> {
    // For demo purposes, we'll simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock AI response based on user query
    const userQuery = text.toLowerCase();
    
    if (userQuery.includes('hello') || userQuery.includes('hi')) {
      return "Hello! I'm the Spotmies AI assistant. How can I help you today?";
    } else if (userQuery.includes('help')) {
      return "I'm here to help! You can ask me questions about Spotmies' products, services, or general inquiries.";
    } else if (userQuery.includes('product') || userQuery.includes('service')) {
      return "Spotmies offers a range of innovative products and services. For detailed information, please visit our website or ask me specific questions about what you're looking for.";
    } else {
      return "I understand your question. In a fully implemented version, I would search through our knowledge base to provide the most accurate answer. Is there anything specific about Spotmies you'd like to know?";
    }
  },

  // Document related API calls
  async getDocuments(): Promise<Document[]> {
    // Mock implementation
    return [
      {
        id: '1',
        title: 'Company FAQ',
        content: 'Frequently Asked Questions about Spotmies LLP...',
        fileType: 'pdf',
        uploadDate: new Date('2023-05-15')
      },
      {
        id: '2',
        title: 'Product Manual',
        content: 'Detailed instructions for using Spotmies products...',
        fileType: 'docx',
        uploadDate: new Date('2023-06-20')
      }
    ];
  },

  async uploadDocument(file: File, title: string): Promise<void> {
    // For demo purposes, we'll simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(`Document "${title}" uploaded successfully`);
  },

  async deleteDocument(id: string): Promise<void> {
    // For demo purposes, we'll simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Document with id ${id} deleted successfully`);
  },

  // Auth related API calls
  async login(username: string, password: string): Promise<User> {
    // For demo purposes, we'll simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login - in a real app, this would validate credentials with the backend
    if (username === 'admin' && password === 'admin123') {
      return {
        id: '1',
        username: 'admin',
        isAdmin: true
      };
    } else if (username === 'user' && password === 'user123') {
      return {
        id: '2',
        username: 'user',
        isAdmin: false
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }
};