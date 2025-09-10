export interface ApiResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
  pagination?: PaginationResponse;
}

export interface CreateProduct {
  name: string;
  description?: string;
  price: number;
}

export interface UpdateProduct {
  name: string;
  description?: string;
  price: number;
}

export interface PaginationResponse {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date | string;
}
