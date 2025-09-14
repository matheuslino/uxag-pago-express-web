import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './deposit.html',
  styleUrl: './deposit.scss'
})
export class Deposit {
  
  public isModalVisible = false;

  public depositData = {
    valor: null as number | null
  };

  public paymentInfo = {
    identificador: 'PixPay LTDA',
    cnpj: '44.190.808/0001-54',
    dataCriacao: '19/03/2025',
    dataExpiracao: '19/03/2025',
    valor: 0,
    pixCopyPaste: '00020126800014br.gov.bcb.pix013696c4a062-e16b-447c-9421-5...'
  };

  openConfirmationModal(): void {
    if (this.depositData.valor && this.depositData.valor > 0) {
      this.paymentInfo.valor = this.depositData.valor;
      this.isModalVisible = true;
    } else {
      alert('Por favor, insira um valor para o depósito.');
    }
  }

  closeConfirmationModal(): void {
    this.isModalVisible = false;
  }

  proceedWithPayment(): void {
    console.log('Prosseguindo com o pagamento de:', this.paymentInfo.valor);
    this.closeConfirmationModal();
    this.depositData.valor = null;
  }
}