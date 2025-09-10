import { Component, OnInit, ViewChild } from '@angular/core';
import { Product, ApiResponse } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { MessageService } from 'primeng/api';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;
  @ViewChild(UpdateDialogComponent)
  updateDialogComponent!: UpdateDialogComponent;

  productList: Product[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  selectedProductId: number = 0;
  selectedProductName: string = '';

  constructor(
    private readonly productService: ProductService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (response: ApiResponse<Product[]>) => {
        this.productList = response.data ?? [];
        if (response.pagination) {
          this.totalPages = response.pagination.totalPages;
          this.currentPage = response.pagination.pageNumber;
        }
      },
      error: () => {},
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  onEdit(id: number): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Editar Producto',
      detail: `Editar producto con ID: ${id}`,
      life: 3000,
    });
  }

  onDelete(id: number, name: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.messageToast(
          `Producto "${name}" eliminado correctamente`,
          'success'
        );
        this.loadProducts();
      },
      error: () => {
        this.messageToast('Error al eliminar el producto', 'error');
      },
    });
  }

  messageToast(message: string, severity: string): void {
    this.messageService.add({
      severity,
      summary: message,
      detail: 'Message Content',
    });
  }

  prepareDelete(event: Event, id: number, name: string): void {
    this.selectedProductId = id;
    this.selectedProductName = name;

    this.dialogComponent.confirmDelete(event);
  }

  onDeleteConfirmed(): void {
    this.onDelete(this.selectedProductId, this.selectedProductName);
  }

  prepareUpdate(id: number): void {
    const product = this.productList.find((p) => p.id === id);

    if (product && this.updateDialogComponent) {
      this.updateDialogComponent.showDialog(product);
    }
  }
  
}
