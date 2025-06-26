// src/app/core/services/modal.service.ts
import { Injectable, signal, inject } from '@angular/core';
// Importamos TODAS las interfaces que necesitamos
import { ProductListItem, ProductDetail, ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  productService = inject(ProductService);
  // La señal ahora almacenará un ProductDetail, o null
  selectedProductDetails = signal<ProductDetail | null>(null);

  /**
   * Abre el modal. Recibe la información básica de la tarjeta
   * y luego busca los detalles completos en la API.
   * @param productListItem La información del producto desde la tarjeta en la que se hizo clic.
   */
  openModal(productListItem: ProductListItem) {
    // Primero, podemos mostrar una versión básica en el modal si quisiéramos (opcional).
    // O simplemente esperamos la respuesta de la API.
    
    this.productService.getProductDetails(productListItem.brand, productListItem.name)
      .subscribe((details: ProductDetail) => {
        // Cuando la API responde, actualizamos la señal con los detalles completos.
        this.selectedProductDetails.set(details);
      });
  }

  closeModal() {
    this.selectedProductDetails.set(null);
  }
}