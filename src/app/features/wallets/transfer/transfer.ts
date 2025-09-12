import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
export interface IPendingWithdrawal {
  solicitante: {
    name: string;
    email: string;
  };
  carteira: {
    id: number;
    name: string;
  };
  chavePix: string;
  valor: number;
  dataHora: string; 
  status: 'Pendente';
}

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule 
  ], 
  templateUrl: './transfer.html',
  styleUrl: './transfer.scss'
})
export class Transfer {

  public hasPendingWithdrawals = false;
  public pendingWithdrawals: IPendingWithdrawal[] = [];

  public isModalVisible = false;

  public transferData = {
    chavePix: '',
    valor: null as number | null
  };

  openConfirmationModal(): void {
    if (this.transferData.chavePix && this.transferData.valor) {
      this.isModalVisible = true;
    } else {
      alert('Por favor, preencha a Chave PIX e o Valor.');
    }
  }

  closeConfirmationModal(): void {
    this.isModalVisible = false;
  }

  confirmTransfer(): void {
    if (!this.transferData.valor) return;

    const newWithdrawal: IPendingWithdrawal = {
      solicitante: {
        name: 'Lucas Admin',
        email: 'lucas.admin@example.com' 
      },
      carteira: {
        id: 531, 
        name: 'Wallet 2'
      },
      chavePix: this.transferData.chavePix,
      valor: this.transferData.valor,
      dataHora: `R$ ${this.transferData.valor.toFixed(2).replace('.', ',')}`, // Formatação simples da data/hora
      status: 'Pendente'
    };

    this.pendingWithdrawals.push(newWithdrawal);
    this.hasPendingWithdrawals = true;

    this.transferData.chavePix = '';
    this.transferData.valor = null;
    this.closeConfirmationModal();
  }
}