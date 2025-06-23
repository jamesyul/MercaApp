@Injectable({ providedIn: 'root' })
export class ModalService {
  productService = inject(ProductService);
  selectedProductDetails = signal<any | null>(null);

  openModal(brand: string, name: string) {
    this.productService.getProductDetails(brand, name).subscribe(details => {
      this.selectedProductDetails.set(details);
    });
  }

  closeModal() {
    this.selectedProductDetails.set(null);
  }
}