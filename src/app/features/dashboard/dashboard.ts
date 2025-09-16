import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderDashboard } from '../../shared/components/header-dashboard/header-dashboard';
import { Router } from '@angular/router';

interface Transacao {
  transacaoId: number;
  agenciaNome: string;
  agenciaID: string;
  agenciaLogo?: string;
  dataTransacao: string;
  valorTransacao: number;
  statusTransacao: 'Processada';
  tipo: 'entrada' | 'saida';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, HeaderDashboard],
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
      valorTransacao: 950.50,
      statusTransacao: 'Processada',
      tipo: 'entrada'
    },
    {
      transacaoId: 2,
      agenciaNome: 'Paypal',
      agenciaID: 'P',
      agenciaLogo: 'assets/images/paypal.png',
      dataTransacao: 'Mar 12, 2025 • 11h32',
      valorTransacao: -100.20,
      statusTransacao: 'Processada',
      tipo: 'saida'
    },
    {
      transacaoId: 3,
      agenciaNome: 'AWS',
      agenciaID: 'AWS',
      agenciaLogo: 'assets/images/aws.png',
      dataTransacao: 'Jan 31, 2025 • 09h08',
      valorTransacao: 2250.00,
      statusTransacao: 'Processada',
      tipo: 'entrada'
    },
    {
      transacaoId: 4,
      agenciaNome: 'CSO Homol',
      agenciaID: 'CH',
      dataTransacao: 'Jan 07, 2025 • 15h58',
      valorTransacao: -121.00,
      statusTransacao: 'Processada',
      tipo: 'saida'
    }
  ];

  filteredTransactions: Transacao[] = [];
  activeFilter: string = 'todos';

  constructor(private router: Router) {
    this.filterTransactions('todos');
  }

  filterTransactions(type: 'todos' | 'entrada' | 'saida') {
    this.activeFilter = type;
    if (type === 'todos') {
      this.filteredTransactions = this.transacoes;
    } else {
      this.filteredTransactions = this.transacoes.filter(t => t.tipo === type);
    }
  }

  goToEnviarPix() {
    this.router.navigate(['carteira/send-pix']);
  }

  goToPagarBoleto() {
    this.router.navigate(['carteira/payment']);
  }

  goToTransferir() {
    this.router.navigate(['carteira/transfer']);
  }

  goToSolicitar() {
    this.router.navigate(['carteira/deposit']);
  }
}
