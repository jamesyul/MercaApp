// src/app/modules/dashboard/components/product-card/product-card.component.ts
import { Component, Input, inject } from '@angular/core';
// Cambiamos la importación para usar la nueva interfaz
import { ProductListItem } from '../../../../core/services/product.service';
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
  // El Input ahora espera un ProductListItem
  @Input({ required: true }) product!: ProductListItem;
  modalService = inject(ModalService);

  openDetails() {
    this.modalService.openModal(this.product);
  }
}