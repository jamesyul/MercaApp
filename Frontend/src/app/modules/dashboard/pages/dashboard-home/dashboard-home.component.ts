import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../../../core/services/product.service';
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
  products: Product[] = [];

  constructor() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}