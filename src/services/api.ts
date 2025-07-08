import { 
  Link, 
  CreateLinkRequest, 
  CreateLinkResponse, 
  ApiResponse, 
  LinksResponse, 
  ExportResponse 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async createLink(originalUrl: string): Promise<CreateLinkResponse> {
    const response = await this.request<CreateLinkResponse>('/links', {
      method: 'POST',
      body: JSON.stringify({ originalUrl }),
    });
    return response.data!;
  }

  async getLinks(): Promise<LinksResponse> {
    const response = await this.request<LinksResponse>('/links');
    return response.data!;
  }

  async deleteLink(id: string): Promise<void> {
    await this.request(`/links/${id}`, {
      method: 'DELETE',
    });
  }

  async exportLinks(): Promise<ExportResponse> {
    const response = await this.request<ExportResponse>('/links/export', {
      method: 'POST',
    });
    return response.data!;
  }
}

export const apiService = new ApiService(); 