import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
interface Transacao {
  transacaoId: number;
  agenciaNome: string;
  agenciaID: string;
  agenciaLogo?: string;
  dataTransacao: string;
  valorTransacao: number;
  statusTransacao: 'Processada';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  totalTransacoes: string = "3.458";
  percentualCrescimento: number = 11;
  carteirasAtivas: number = 12;
  pagamentosAtrasados: number = 2;
transacoes: Transacao[] = [
  {
    transacaoId: 1,
    agenciaNome: 'UX AGENCY',
    agenciaID: 'UA',
    dataTransacao: 'Mar 07, 2025 • 15h58',
    valorTransacao: 250.00,
    statusTransacao: 'Processada'
  },
  {
    transacaoId: 2,
    agenciaNome: 'Paypal',
    agenciaID: 'P',
    agenciaLogo: 'assets/images/paypal.png',
    dataTransacao: 'Mar 12, 2025 • 11h32',
    valorTransacao: 9480.00,
    statusTransacao: 'Processada'
  },
  {
    transacaoId: 3,
    agenciaNome: 'AWS',
    agenciaID: 'AWS',
    agenciaLogo: 'assets/images/aws.png',
    dataTransacao: 'Jan 31, 2025 • 09h08',
    valorTransacao: 2250.00,
    statusTransacao: 'Processada'
  },
  {
    transacaoId: 4,
    agenciaNome: 'CSO Homol',
    agenciaID: 'CH',
    dataTransacao: 'Jan 07, 2025 • 15h58',
    valorTransacao: 121.00,
    statusTransacao: 'Processada'
  }
];

}
