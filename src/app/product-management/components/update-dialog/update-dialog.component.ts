import { Component } from '@angular/core';
import { Product, UpdateProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ListProductsComponent } from '../list-products/list-products.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css'],
})
export class UpdateDialogComponent {
  visible: boolean = false;
  productToEdit!: Product;

  constructor(
    private readonly productService: ProductService,
    private readonly listproductsComponent: ListProductsComponent,
    private readonly messageService: MessageService
  ) {}

  showDialog(ProductToEdit: Product): void {
    this.productToEdit = ProductToEdit;
    this.visible = true;
  }

  onUpdate(updatedProduct: UpdateProduct) {

    const product: Product = {
      id: this.productToEdit.id,
      name: updatedProduct.name,
      description: updatedProduct.description ?? '',
      price: updatedProduct.price,
      createdAt: this.productToEdit.createdAt,
    };

    this.productService.updateProduct(product).subscribe({
      next: () => {
        this.visible = false;
        this.listproductsComponent.loadProducts();
        this.messageUpdate();
      },
      error: () => {},
    });
  }

  messageUpdate() {
    this.messageService.add({
      severity: 'success',
      summary: 'Producto actualizado',
      detail: 'El producto ha sido actualizado correctamente',
      life: 3000
    });
  }
}
