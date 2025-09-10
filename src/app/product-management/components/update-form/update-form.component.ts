import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UpdateProduct } from '../../interfaces/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnChanges {

  @Input() productToEdit!: UpdateProduct;
  @Output() productUpdated = new EventEmitter<UpdateProduct>();
  @Output() confirmUpdate = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.initForm();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productToEdit'] && this.productToEdit) {
      this.form.patchValue(this.productToEdit);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.productUpdated.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
    this.confirmUpdate.emit();
  }

}
