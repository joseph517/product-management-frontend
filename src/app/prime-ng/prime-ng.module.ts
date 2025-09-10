import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    ToastModule
  ],
  exports: [
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
