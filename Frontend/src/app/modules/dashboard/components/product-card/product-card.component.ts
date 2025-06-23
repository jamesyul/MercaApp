import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  modalService = inject(ModalService);

  openDetails() {
    // Ahora pasamos la info necesaria para la llamada a la API
    this.modalService.openModal(this.product.brand, this.product.name);
  }
}



