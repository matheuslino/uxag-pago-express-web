import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

export interface Empresa {
  id: number;
  nome: string;
}

export interface Saque {
  id: number;
  empresaId: number;
  solicitante: string;
  usuarioSolicitante: string;
  carteira: string;
  chavePix: string;
  valor: number;
  dataHora: Date;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado' | 'Processando';
  aprovador: string;
  statusAprovador: 'pendente' | 'aprovado' | 'rejeitado';
}

@Component({
  selector: 'app-withdrawals',
  imports: [
    RouterModule,
    MatIconModule,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './withdrawals.html',
  styleUrl: './withdrawals.scss'
})
export class Withdrawals implements OnInit {

  public headerInformation = {
    pageTitle: 'Aprovar saques',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Saques', path: '/administracao/withdrawals' }
    ],
  };

  public empresas: Empresa[] = [
    { id: 0, nome: 'Todas as empresas' },
    { id: 1, nome: '123 Milhas' },
    { id: 2, nome: 'Tech Solutions' },
    { id: 3, nome: 'Stark Industries' },
    { id: 4, nome: 'Acme Corp' }
  ];

  public statusOptions = [
    { value: 'todos', label: 'Todos os status' },
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Aprovado', label: 'Aprovado' },
    { value: 'Rejeitado', label: 'Rejeitado' },
    { value: 'Processando', label: 'Processando' }
  ];

  public saques: Saque[] = [
    {
      id: 1,
      empresaId: 1,
      solicitante: 'Pago Express',
      usuarioSolicitante: 'lucas_adm',
      carteira: '531 Wallet 2',
      chavePix: 'cliente@pix.bcb.gov.br',
      valor: 239.12,
      dataHora: new Date('2025-03-17T01:07:00'),
      status: 'Pendente',
      aprovador: 'lucas_adm',
      statusAprovador: 'pendente'
    },
    {
      id: 2,
      empresaId: 1,
      solicitante: '123 Milhas',
      usuarioSolicitante: 'maria_fin',
      carteira: '123 Main Wallet',
      chavePix: '11987654321',
      valor: 1500.00,
      dataHora: new Date('2025-03-16T14:30:00'),
      status: 'Pendente',
      aprovador: 'admin_123',
      statusAprovador: 'pendente'
    },
    {
      id: 3,
      empresaId: 2,
      solicitante: 'Tech Solutions',
      usuarioSolicitante: 'tech_user',
      carteira: 'Tech Primary',
      chavePix: '12.345.678/0001-90',
      valor: 2750.50,
      dataHora: new Date('2025-03-15T09:15:00'),
      status: 'Aprovado',
      aprovador: 'tech_admin',
      statusAprovador: 'aprovado'
    },
  ];

  public filtros = {
    empresaId: 0,
    status: 'todos',
    dataInicio: '',
    dataFim: '',
    periodo: 'todos'
  };

  ngOnInit(): void {
    this.filtros.periodo = 'semana';
    this.onPeriodoChange();
  }

  get dataAtual(): string {
    return new Date().toISOString().split('T')[0];
  }

  get dataSeteDiasAtras(): string {
    const data = new Date();
    data.setDate(data.getDate() - 7);
    return data.toISOString().split('T')[0];
  }

  get dataTrintaDiasAtras(): string {
    const data = new Date();
    data.setDate(data.getDate() - 30);
    return data.toISOString().split('T')[0];
  }

  onPeriodoChange(): void {
    switch (this.filtros.periodo) {
      case 'hoje':
        this.filtros.dataInicio = this.dataAtual;
        this.filtros.dataFim = this.dataAtual;
        break;
      case 'semana':
        this.filtros.dataInicio = this.dataSeteDiasAtras;
        this.filtros.dataFim = this.dataAtual;
        break;
      case 'mes':
        this.filtros.dataInicio = this.dataTrintaDiasAtras;
        this.filtros.dataFim = this.dataAtual;
        break;
      case 'todos':
        this.filtros.dataInicio = '';
        this.filtros.dataFim = '';
        break;
    }
  }

  get saquesFiltrados(): Saque[] {
    let saques = this.saques;
    if (this.filtros.empresaId > 0) {
      saques = saques.filter(saque => saque.empresaId === this.filtros.empresaId);
    }
    if (this.filtros.status !== 'todos') {
      saques = saques.filter(saque => saque.status === this.filtros.status);
    }
    if (this.filtros.dataInicio) {
      saques = saques.filter(saque => {
        const dataSaque = saque.dataHora.toISOString().split('T')[0];
        return dataSaque >= this.filtros.dataInicio;
      });
    }
    if (this.filtros.dataFim) {
      saques = saques.filter(saque => {
        const dataSaque = saque.dataHora.toISOString().split('T')[0];
        return dataSaque <= this.filtros.dataFim;
      });
    }

    return saques;
  }

  get totalRegistros(): number {
    return this.saquesFiltrados.length;
  }

  get saquesPendentes(): Saque[] {
    return this.saquesFiltrados.filter(saque => 
      saque.status === 'Pendente' && saque.statusAprovador === 'pendente'
    );
  }

  get valorTotalPendente(): number {
    return this.saquesPendentes.reduce((total, saque) => total + saque.valor, 0);
  }

  formatarDataHora(data: Date): string {
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    
    return `${horas}h${minutos} — ${dia}/${mes}/${ano}`;
  }

  formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  onAprovar(saque: Saque): void {
    if (confirm(`Aprovar saque de ${this.formatarValor(saque.valor)} para ${saque.solicitante}?`)) {
      saque.status = 'Aprovado';
      saque.statusAprovador = 'aprovado';
      console.log('Saque aprovado:', saque);
    }
  }

  onRejeitar(saque: Saque): void {
    if (confirm(`Rejeitar saque de ${this.formatarValor(saque.valor)} para ${saque.solicitante}?`)) {
      saque.status = 'Rejeitado';
      saque.statusAprovador = 'rejeitado';
      console.log('Saque rejeitado:', saque);
    }
  }

  getStatusClass(status: string): string {
    const classes = {
      'Pendente': 'status-pendente',
      'Aprovado': 'status-aprovado',
      'Rejeitado': 'status-rejeitado',
      'Processando': 'status-processando'
    };
    return classes[status as keyof typeof classes] || '';
  }

  getAprovadorIconClass(statusAprovador: string): string {
    const classes = {
      'pendente': 'aprovador-icon-pendente',
      'aprovado': 'aprovador-icon-green',
      'rejeitado': 'aprovador-icon-red'
    };
    return classes[statusAprovador as keyof typeof classes] || '';
  }
  
  aprovarTodos(): void {
    const pendentes = this.saquesPendentes;
    if (pendentes.length === 0) return;

    const valorTotal = this.formatarValor(this.valorTotalPendente);
    if (confirm(`Aprovar todos os ${pendentes.length} saques pendentes no valor total de ${valorTotal}?`)) {
      pendentes.forEach(saque => {
        saque.status = 'Aprovado';
        saque.statusAprovador = 'aprovado';
      });
      console.log('Todos os saques aprovados:', pendentes);
    }
  }

  limparFiltros(): void {
    this.filtros = {
      empresaId: 0,
      status: 'todos',
      dataInicio: '',
      dataFim: '',
      periodo: 'todos'
    };
  }
}