import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule], 
  templateUrl: './transfer.html',
  styleUrl: './transfer.scss'
})
export class Transfer {

  public hasPendingWithdrawals = true;

  public pendingWithdrawals: IPendingWithdrawal[] = [
    {
      solicitante: {
        name: 'Pago Express',
        email: 'olivia@untitledui.com'
      },
      carteira: {
        id: 531,
        name: 'Wallet 2'
      },
      chavePix: 'cliente@pix.bcb.gov.br',
      valor: 239.12,
      dataHora: 'R$ 239,12', 
      status: 'Pendente'
    },
  ];
}