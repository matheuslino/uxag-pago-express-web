import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-info',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './footer-info-transferencia.html',
  styleUrl: './footer-info-transferencia.scss'
})
export class FooterInfoTransferencia {

  @Input() information: string = '';
  @Input() saldoValor: string = '';
  @Input() tipoChave: string = 'Tipo de chave';
  @Input() chavePixLabel: string = 'Chave PIX';
  @Input() tipoChaveValor: string = '';
  @Input() chavePixValor: string = '';
  @Input() valorTransacao: string = '';
  @Input() confirmSubmitLabel: string = '';
  @Input() confirmCancelLabel: string = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.submit.emit();
  }
}