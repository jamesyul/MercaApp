import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.css']
})
export class ProductDetailModalComponent {
  @Input() product: any;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }

  // Previene que el click en el contenido cierre el modal
  onContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}