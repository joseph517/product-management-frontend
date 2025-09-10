import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProductManagementRoutingModule } from './product-management.routing.module';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    LayoutComponent,
    CreateFormComponent,
    ListProductsComponent,
    UpdateDialogComponent,
    UpdateFormComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNgModule,
]
})
export class ProductManagementModule { }
