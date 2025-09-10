import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @Output() confirmed = new EventEmitter<void>();
  @Input() productName: string = '';

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) { }

  confirmDelete(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar el producto "${this.productName}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-secondary',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.confirmed.emit();
      },
      reject: () => {
        this.messageToast('Eliminación cancelada', 'info');
      }
    });
  }

  messageToast( message: string, severity: string ): void {
    this.messageService.add({
      severity,
      summary: message,
      detail: 'Message Content',
    });
  }

}
