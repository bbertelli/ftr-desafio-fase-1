export interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: string;
  accessCount: number;
}

export interface CreateLinkRequest {
  originalUrl: string;
}

export interface CreateLinkResponse {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: string;
  accessCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface LinksResponse {
  links: Link[];
  total: number;
}

export interface ExportResponse {
  downloadUrl: string;
} 