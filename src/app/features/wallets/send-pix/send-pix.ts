import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-send-pix',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './send-pix.html',
  styleUrl: './send-pix.scss'
})
export class SendPix {

  public showAccountData = false;

  public isModalVisible = false;

  public transferData = {
    chavePix: '',
    valor: null as number | null
  };
  
  public accountData = {
    name: 'PixPay LTDA',
    key: 'testepix@celcoin.com.br',
    cnpj: '44.190.808/0001-54',
    keyType: 'E-MAIL',
    provider: 'Celcoin'
  };

  onChavePixChange(key: string): void {
    if (key && key.length >= 5) {
      this.showAccountData = true;
    } else {
      this.showAccountData = false;
    }
  }

  openConfirmationModal(): void {
    if (this.transferData.chavePix && this.transferData.valor && this.showAccountData) {
      this.isModalVisible = true;
    } else {
      alert('Por favor, preencha uma Chave PIX válida e o Valor.');
    }
  }

  closeConfirmationModal(): void {
    this.isModalVisible = false;
  }

  confirmTransfer(): void {
    console.log('Transferência confirmada:', this.transferData);
    
    this.transferData = { chavePix: '', valor: null };
    this.showAccountData = false;
    this.closeConfirmationModal();
    alert('Transferência enviada!');
  }
}