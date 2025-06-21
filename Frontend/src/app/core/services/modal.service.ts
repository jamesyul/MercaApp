// src/app/core/services/modal.service.ts
import { Injectable, signal } from '@angular/core';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // Una señal que contiene el producto a mostrar, o null si el modal está cerrado.
  selectedProduct = signal<Product | null>(null);

  openModal(product: Product) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }
}