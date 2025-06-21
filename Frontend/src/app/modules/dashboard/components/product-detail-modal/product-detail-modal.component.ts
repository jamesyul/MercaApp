import { Component, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.css']
})
export class ProductDetailModalComponent {
  public modalService = inject(ModalService);
  public showOffersView = false;
}