// src/app/core/services/modal.service.ts
import { Injectable, signal } from '@angular/core';
import { Product, ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ModalService {
  productService = inject(ProductService);
  selectedProductDetails = signal<any | null>(null);

  // Ahora recibe un objeto Product
  openModal(product: Product) {
    // Primero, mostramos la info que ya tenemos
    this.selectedProductDetails.set(product);
    
    // Luego, en segundo plano, buscamos los detalles completos (ofertas)
    this.productService.getProductDetails(product.brand, product.name).subscribe(details => {
      this.selectedProductDetails.set(details);
    });
  }

  closeModal() {
    this.selectedProductDetails.set(null);
  }
}