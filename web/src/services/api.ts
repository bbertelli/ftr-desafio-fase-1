import type { 
  Link,
  CreateLinkResponse, 
  ApiResponse, 
  ExportResponse 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

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
    const response = await this.request<CreateLinkResponse>('/api/links', {
      method: 'POST',
      body: JSON.stringify({ originalUrl }),
    });
    return response.data!;
  }

  async getLinks(): Promise<Link[]> {
    const response = await this.request<Link[]>('/api/links');
    return response.data!;
  }

  async deleteLink(id: string): Promise<void> {
    const url = `${API_BASE_URL}/api/links/${id}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Erro ao deletar link');
    }
  }

  async exportLinks(): Promise<ExportResponse> {
    const response = await this.request<ExportResponse>('/api/links/export', {
      method: 'GET',
    });
    return response.data!;
  }

  async getLinkByCode(code: string): Promise<Link | null> {
    const response = await this.request<Link>(`/api/links/${code}/data`);
    return response.data || null;
  }
}

export const apiService = new ApiService(); 