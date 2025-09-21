import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawalAuthorizationData, WithdrawalAuthorizationModalComponent } from '../../../shared/components/withdrawal-authorization-modal.component/withdrawal-authorization-modal.component';

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
  standalone: true,
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

  constructor(
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) { }

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
      dataHora: new Date('2025-09-10T01:07:00'),
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
      dataHora: new Date('2025-09-10T14:30:00'),
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
      dataHora: new Date('2025-09-15T09:15:00'),
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

  openApprovalModal(saque: Saque): void {
    const data: WithdrawalAuthorizationData = {
      solicitante: saque.solicitante,
      chave: saque.chavePix,
      valor: this.formatarValor(saque.valor)
    };

    const dialogRef = this.dialog.open(WithdrawalAuthorizationModalComponent, {
      width: '480px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.approved) {
        saque.status = 'Aprovado';
        saque.statusAprovador = 'aprovado';
      } else if (result?.approved === false) { // Se o modal retornar { approved: false }
        saque.status = 'Rejeitado';
        saque.statusAprovador = 'rejeitado';
      }
      this.cdRef.detectChanges();
    });
  }

  onRejeitar(saque: Saque): void {
    // CORREÇÃO: Usando crases (`) para a string de template
    if (confirm(`Rejeitar saque de ${this.formatarValor(saque.valor)} para ${saque.solicitante}?`)) {
      saque.status = 'Rejeitado';
      saque.statusAprovador = 'rejeitado';
      console.log('Saque rejeitado:', saque);
      this.cdRef.detectChanges(); // Garante a atualização da tela
    }
  }

  // A função abaixo se tornou redundante, pois o modal já cuida da aprovação.
  // Você pode removê-la se quiser.
  /*
  onAprovar(saque: Saque): void {
    // CORREÇÃO: Usando crases (`) para a string de template
    if (confirm(`Aprovar saque de ${this.formatarValor(saque.valor)} para ${saque.solicitante}?`)) {
      saque.status = 'Aprovado';
      saque.statusAprovador = 'aprovado';
      console.log('Saque aprovado:', saque);
    }
  }
  */

  // --- Funções de filtro e getters ---

  get saquesFiltrados(): Saque[] {
    let saques = this.saques;

    if (this.filtros.empresaId > 0) {
      saques = saques.filter(saque => saque.empresaId === this.filtros.empresaId);
    }

    if (this.filtros.status && this.filtros.status !== 'todos') {
      const filtroStatus = String(this.filtros.status).trim().toLowerCase();
      saques = saques.filter(saque => String(saque.status || '').trim().toLowerCase() === filtroStatus);
    }

    if (this.filtros.dataInicio) {
      const inicio = new Date(this.filtros.dataInicio);
      inicio.setHours(0, 0, 0, 0); // Considera o dia inteiro
      saques = saques.filter(saque => saque.dataHora >= inicio);
    }

    if (this.filtros.dataFim) {
      const fim = new Date(this.filtros.dataFim);
      fim.setHours(23, 59, 59, 999); // Considera o dia inteiro
      saques = saques.filter(saque => saque.dataHora <= fim);
    }

    return saques;
  }

  get totalRegistros(): number {
    return this.saquesFiltrados.length;
  }

  onStatusChange(value: any): void {
    console.log('status selecionado ->', value);
  }

  // --- Funções de formatação e utilitárias ---

  formatarDataHora(data: Date): string {
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    // CORREÇÃO: Usando crases (`) para a string de template
    return `${horas}h${minutos} — ${dia}/${mes}/${ano}`;
  }

  formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
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

  // --- Funções para filtros de data (não utilizadas no HTML, mas presentes no código) ---
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
}
