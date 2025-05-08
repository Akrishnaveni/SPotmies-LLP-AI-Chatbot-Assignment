import { makeAutoObservable, runInAction } from 'mobx';
import { User } from '../types';
import { apiService } from '../services/apiService';

class AuthStore {
  currentUser: User | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  async checkAuth() {
    // For demo purposes, we'll set a mock admin user
    // In a real app, you'd check localStorage/sessionStorage and validate with the backend
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      try {
        runInAction(() => {
          this.currentUser = JSON.parse(storedUser);
          this.isAuthenticated = true;
        });
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  async login(username: string, password: string) {
    try {
      this.isLoading = true;
      // In a real app, this would be an API call to validate credentials
      const user = await apiService.login(username, password);
      
      runInAction(() => {
        this.currentUser = user;
        this.isAuthenticated = true;
        this.isLoading = false;
        localStorage.setItem('currentUser', JSON.stringify(user));
      });
      
      return true;
    } catch (error) {
      runInAction(() => {
        this.error = 'Invalid credentials';
        this.isLoading = false;
      });
      return false;
    }
  }

  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
  }

  get isAdmin() {
    return this.currentUser?.isAdmin || false;
  }
}

export const authStore = new AuthStore();