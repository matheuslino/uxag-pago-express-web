import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-transfer-wallet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './transfer-wallet.html',
  styleUrl: './transfer-wallet.scss'
})
export class TransferWallet {

  public isModalVisible = false;

  public transferData = {
    favorecido: '',
    carteiraFavorecido: '',
    chavePix: '',
    valor: null as number | null
  };

  openConfirmationModal(): void {
    if (this.transferData.favorecido && this.transferData.carteiraFavorecido && this.transferData.valor) {
      this.isModalVisible = true;
    } else {
      alert('Por favor, preencha todos os dados do favorecido e o valor.');
    }
  }

  closeConfirmationModal(): void {
    this.isModalVisible = false;
  }

  confirmTransfer(): void {
    console.log('Transferência confirmada:', this.transferData);
    
    this.transferData = {
      favorecido: '',
      carteiraFavorecido: '',
      chavePix: '',
      valor: null
    };
    this.closeConfirmationModal();
    alert('Transferência enviada para autorização!');
  }
}