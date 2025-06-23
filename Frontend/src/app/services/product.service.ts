import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

/**
 * Interfaz para la vista de cuadrícula de productos.
 * Representa un producto lógico agrupado, con su precio más bajo.
 * Coincide con lo que devuelve el método 'index' del ProductController de Laravel.
 */
export interface ProductListItem {
  id: number;       // Puede ser el id de una de las instancias del producto
  name: string;     // Nombre del producto, ej: "Aceite de Oliva Virgen Extra"
  brand: string;    // Marca del producto, ej: "Carbonell"
  imageUrl: string; // URL de la imagen principal
  price: number;    // El precio MÁS BAJO encontrado entre todos los supermercados
}

/**
 * Interfaz para una oferta específica de un supermercado.
 * Coincide con cada elemento del array 'offers' que devuelve el método 'show'.
 */
export interface ProductOffer {
  supermarket: string;      // Nombre del supermercado, ej: "Mercadona"
  price: number;            // Precio en ESE supermercado
  shipping: string;         // Información de envío (por ahora, texto fijo)
  url: string;              // URL directa al producto en la web del supermercado
  supermarketLogo?: string; // URL al logo del supermercado (opcional)
}

/**
 * Interfaz para el detalle completo de un producto.
 * Representa la respuesta completa del método 'show' del ProductController.
 */
export interface ProductDetail {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  summary: string; // Resumen o descripción del producto
  offers: ProductOffer[]; // Un array con todas las ofertas de los diferentes supermercados
  // Podríamos añadir más campos si la API los devuelve, como 'rating', 'reviews', etc.
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /**
   * Obtiene la lista de productos para la vista de cuadrícula principal.
   * Cada producto es un agregado con el precio más bajo.
   * Llama a GET /api/products.
   * @returns Un Observable con un array de productos para la lista.
   */
  getProducts(): Observable<ProductListItem[]> {
    return this.http.get<ProductListItem[]>(`${this.apiUrl}/products`);
  }

  /**
   * Obtiene los detalles y todas las ofertas de un producto específico,
   * identificado por su marca y nombre.
   * Llama a GET /api/products/details/{brand}/{name}.
   * @param brand La marca del producto.
   * @param name El nombre del producto.
   * @returns Un Observable con el objeto de detalle completo del producto.
   */
  getProductDetails(brand: string, name: string): Observable<ProductDetail> {
    // Codificamos los parámetros para que sean seguros en una URL
    const encodedBrand = encodeURIComponent(brand);
    const encodedName = encodeURIComponent(name);
    
    return this.http.get<ProductDetail>(`${this.apiUrl}/products/details/${encodedBrand}/${encodedName}`);
  }
}