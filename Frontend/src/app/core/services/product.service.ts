// src/app/core/services/product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

/**
 * Interfaz para la vista de lista/cuadrícula de productos.
 * Coincide con la respuesta de tu API en GET /api/products.
 */
export interface ProductListItem {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  price: number; // El precio más bajo encontrado
}

/**
 * Interfaz para la vista de detalle de un producto (Modal).
 * Coincide con la respuesta de tu API en GET /api/products/details/{brand}/{name}.
 */
export interface ProductDetail {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  summary: string;
  offers: ProductOffer[];
}

/**
 * Interfaz para una oferta específica de un supermercado.
 */
export interface ProductOffer {
  supermarket: string;
  price: number;
  shipping: string;
  url: string;
  supermarketLogo?: string; // Opcional por ahora
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }

  /**
   * Obtiene la lista de productos agrupados con su precio más bajo.
   * Llama a: GET /api/products
   */
  getProducts(): Observable<ProductListItem[]> {
    return this.http.get<ProductListItem[]>(`${this.apiUrl}/products`);
  }

  /**
   * Obtiene los detalles y todas las ofertas de un producto específico.
   * Llama a: GET /api/products/details/{brand}/{name}
   */
  getProductDetails(brand: string, name: string): Observable<ProductDetail> {
    const encodedBrand = encodeURIComponent(brand);
    const encodedName = encodeURIComponent(name);
    
    return this.http.get<ProductDetail>(`${this.apiUrl}/products/details/${encodedBrand}/${encodedName}`);
  }
}