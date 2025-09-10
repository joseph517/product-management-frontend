import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CreateProduct } from '../../interfaces/product.interface';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'product-management-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {

  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;

  productForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly messageService: MessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      description: ['']
    });
  }

  /**
   * Indicates whether the error message for the given form field should be shown.
   * @param fieldName The name of the form field.
   * @returns `true` if the form field has errors and has been touched or the form has been submitted.
   */
  shouldShowError(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.touched || this.submitted));
  }

  /**
   * Gets the error messages for the given form field. The error messages are only returned
   * if the form field has errors and has been touched or the form has been submitted.
   * @param fieldName The name of the form field.
   * @returns The error messages for the given form field.
   */
  getFieldErrors(fieldName: string): string[] {
    const field = this.productForm.get(fieldName);
    const errors: string[] = [];

    if (field?.errors && this.shouldShowError(fieldName)) {
      if (field.errors['required']) {
        errors.push(this.getRequiredErrorMessage(fieldName));
      }
      if (field.errors['min']) {
        errors.push(this.getMinErrorMessage(fieldName));
      }
    }

    return errors;
  }

  /**
   * Gets the required error message for the given form field. If the field does not have a
   * specific required error message, it returns a default error message.
   * @param fieldName The name of the form field.
   * @returns The required error message for the given form field.
   */
  private getRequiredErrorMessage(fieldName: string): string {
    const messages: { [key: string]: string } = {
      'name': 'El nombre es obligatorio.',
      'price': 'El precio es obligatorio.'
    };
    return messages[fieldName] || 'Este campo es obligatorio.';
  }

  /**
   * Obtiene el mensaje de error para el campo especificado
   * si supera el valor mínimo permitido.
   *
   * @param {string} fieldName El nombre del campo del formulario
   * @returns {string} El mensaje de error correspondiente
   */
  private getMinErrorMessage(fieldName: string): string {
    const messages: { [key: string]: string } = {
      'price': 'El precio debe ser mayor que 0.'
    };
    return messages[fieldName] || 'Valor mínimo no alcanzado.';
  }

  /**
   * Returns whether the form is valid or not.
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  isFormValid(): boolean {
    return this.productForm.valid;
  }

  /**
   * Marca todos los campos del formulario como tocados, lo que significa que
   * los mensajes de error se mostrarán si el formulario no es válido.
   */
  private markAllFieldsAsTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key)?.markAsTouched();
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.markAllFieldsAsTouched();

    if (this.productForm.invalid) {
      return;
    }

    this.loading = true;
    const newProduct: CreateProduct = this.productForm.value;

    this.productService.createProduct(newProduct).subscribe({
      next: () => {
        this.showSuccessMessage();
      },
      error: (err) => {
        this.handleError(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
    this.resetForm();
  }

  private showSuccessMessage(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Producto creado',
      detail: 'El producto ha sido creado correctamente',
      life: 3000
    });
  }

  private handleError(error: HttpErrorResponse): void {
    console.error('Error al crear producto:', error);
    this.messageService.add({
      severity: 'error',
      summary: 'Error al crear el producto',
      detail: 'No se pudo crear el producto. Por favor, intente nuevamente.',
      life: 3000
    });
    this.loading = false;
  }

  private resetForm(): void {
    this.productForm.reset();
    this.submitted = false;
  }
}
