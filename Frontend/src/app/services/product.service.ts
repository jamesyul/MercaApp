import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

// La interfaz debe coincidir con la respuesta de la API
export interface Product {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  // ... (otros campos que devuelva tu API)
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductDetails(brand: string, name: string): Observable<any> {
    const encodedBrand = encodeURIComponent(brand);
    const encodedName = encodeURIComponent(name);
    return this.http.get<any>(`${this.apiUrl}/products/details/${encodedBrand}/${encodedName}`);
  }
}