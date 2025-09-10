import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  CreateProduct,
  Product,
  ApiResponse,
  UpdateProduct
} from '../interfaces/product.interface';
import { environment } from 'src/app/enviroments/enviroments';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly url = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  createProduct(product: CreateProduct): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(this.url, product);
  }

  getProducts(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(
      `${this.url}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  updateProduct(product: Product): Observable<ApiResponse<UpdateProduct>> {
    return this.http.put<ApiResponse<UpdateProduct>>(
      `${this.url}/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
