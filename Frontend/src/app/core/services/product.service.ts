// src/app/core/services/product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

/**
 * Interfaz para la vista de lista/cuadrícula de productos.
 * Coincide con la respuesta de tu API en GET /api/products.
 * ¡AÑADIMOS LOS CAMPOS QUE FALTABAN!
 */
export interface ProductListItem {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  price: number; // El precio más bajo encontrado
  oldPrice?: number; // Opcional
  discount?: number; // Opcional
  rating?: number;   // Opcional
}

/**
 * Interfaz para la vista de detalle de un producto (Modal).
 * Coincide con la respuesta de tu API en GET /api/products/details/{brand}/{name}.
 * ¡AÑADIMOS LOS CAMPOS QUE FALTABAN!
 */
export interface ProductDetail {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  summary: string;
  offers: ProductOffer[];
  price?: number;      // El precio más bajo (para mostrarlo fácilmente)
  oldPrice?: number;   // El precio original más alto (para comparación)
  rating?: number;     // Opcional
  reviews?: number;    // Opcional
}

/**
 * Interfaz para una oferta específica de un supermercado.
 */
export interface ProductOffer {
  supermarket: string;
  price: number;
  shipping: string;
  url: string;
  supermarketLogo?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }

  getProducts(): Observable<ProductListItem[]> {
    return this.http.get<ProductListItem[]>(`${this.apiUrl}/products`);
  }

  getProductDetails(brand: string, name: string): Observable<ProductDetail> {
    const encodedBrand = encodeURIComponent(brand);
    const encodedName = encodeURIComponent(name);
    
    return this.http.get<ProductDetail>(`${this.apiUrl}/products/details/${encodedBrand}/${encodedName}`);
  }
}