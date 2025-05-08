import { makeAutoObservable, runInAction } from 'mobx';
import { Document } from '../types';
import { apiService } from '../services/apiService';

class DocumentStore {
  documents: Document[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadDocuments();
  }

  async loadDocuments() {
    try {
      this.isLoading = true;
      const documents = await apiService.getDocuments();
      runInAction(() => {
        this.documents = documents;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to load documents';
        this.isLoading = false;
      });
    }
  }

  async uploadDocument(file: File, title: string) {
    try {
      this.isLoading = true;
      await apiService.uploadDocument(file, title);
      await this.loadDocuments(); // Reload documents after upload
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to upload document';
        this.isLoading = false;
      });
    }
  }

  async deleteDocument(id: string) {
    try {
      this.isLoading = true;
      await apiService.deleteDocument(id);
      runInAction(() => {
        this.documents = this.documents.filter(doc => doc.id !== id);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to delete document';
        this.isLoading = false;
      });
    }
  }
}

export const documentStore = new DocumentStore();