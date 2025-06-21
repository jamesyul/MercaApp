// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  discount?: number;
  // Para el detalle
  summary: string;
  colors: { color: string, price: number }[];
  offers: { supermarket: string, supermarketLogo: string, price: number, shipping: string }[];
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mockProducts: Product[] = [
    { id: 1, name: 'Zapatillas Deportivas Ultra Boost', brand: 'Adidas', imageUrl: 'https://i.imgur.com/Y1LKaiA.png', rating: 4.8, reviews: 1395, price: 110.49, oldPrice: 129.99, discount: 15, summary: 'Zapatillas de running con la mejor amortiguación y retorno de energía.', colors: [], offers: [] },
    { id: 2, name: 'Smartwatch Serie 8', brand: 'TechPro', imageUrl: 'https://i.imgur.com/Q2JrC5x.png', rating: 4.5, reviews: 302, price: 249.50, summary: 'Tu compañero ideal para una vida saludable y conectada.', colors: [], offers: [] },
    { id: 3, name: 'Auriculares Inalámbricos SoundPro', brand: 'Audiophile', imageUrl: 'https://i.imgur.com/L53oBCc.png', rating: 4.9, reviews: 812, price: 80.91, oldPrice: 89.90, discount: 10, summary: 'Sumérgete en tu música con cancelación de ruido activa.', colors: [], offers: [] },
    { id: 4, name: 'Mochila Urbana Explorer', brand: 'UrbanGear', imageUrl: 'https://i.imgur.com/4zYgX3A.png', rating: 4.7, reviews: 450, price: 52.25, oldPrice: 55.00, discount: 5, summary: 'Diseño minimalista y funcional para tu día a día.', colors: [], offers: [] },
    { id: 5, name: 'Cafetera Express Pro', brand: 'HomeBarista', imageUrl: 'https://i.imgur.com/2mSn9zT.png', rating: 4.6, reviews: 620, price: 99.99, summary: 'El café perfecto cada mañana sin salir de casa.', colors: [], offers: [] },
    { id: 6, name: 'Yogur Griego Natural', brand: 'Lácteos del Sol', imageUrl: 'https://i.imgur.com/tOa7aCg.png', rating: 4.9, reviews: 1200, price: 2.50, summary: 'Cremosidad y sabor inigualables.', colors: [], offers: [] },
    { id: 7, name: 'Aceite de Oliva Virgen Extra', brand: 'El Olivar', imageUrl: 'https://i.imgur.com/6E2hU9u.png', rating: 5.0, reviews: 2500, price: 8.75, summary: 'El oro líquido de nuestros campos, directo a tu mesa.', colors: [], offers: [] },
    { id: 8, name: 'Tableta de Chocolate Negro 85%', brand: 'Cacao Fino', imageUrl: 'https://i.imgur.com/3c8wS7x.png', rating: 4.8, reviews: 890, price: 3.20, summary: 'Intenso y lleno de matices, para los amantes del buen cacao.', colors: [], offers: [] }
  ];

  constructor() { }

  getProducts() {
    return of(this.mockProducts);
  }
}