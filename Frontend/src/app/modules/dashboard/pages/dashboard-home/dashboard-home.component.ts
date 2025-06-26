// src/app/modules/dashboard/pages/dashboard-home/dashboard-home.component.ts
import { Component, inject } from '@angular/core';
// Cambiamos la importación para usar la nueva interfaz
import { ProductListItem, ProductService } from '../../../../core/services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {
  productService = inject(ProductService);
  // La propiedad ahora es de tipo ProductListItem[]
  products: ProductListItem[] = [];

  constructor() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}