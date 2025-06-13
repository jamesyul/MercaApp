import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductDetailModalComponent } from '../../components/product-detail-modal/product-detail-modal.component';
import { MOCK_PRODUCTS } from './mock-products'; // Datos de ejemplo

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ProductDetailModalComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = MOCK_PRODUCTS;
  selectedProduct: any = null;

  onViewProduct(product: any): void {
    this.selectedProduct = product;
  }

  onCloseModal(): void {
    this.selectedProduct = null;
  }
}