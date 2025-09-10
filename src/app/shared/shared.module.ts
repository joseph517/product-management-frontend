import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './components/dialog/dialog.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    NavbarComponent,
    DialogComponent,
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  exports: [
    NavbarComponent,
    RouterModule,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimeNgModule,
  ]
})
export class SharedModule { }
