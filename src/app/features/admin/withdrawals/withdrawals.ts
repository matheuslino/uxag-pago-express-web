import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawalAuthorizationData, WithdrawalAuthorizationModalComponent } from '../../../shared/components/withdrawal-authorization-modal.component/withdrawal-authorization-modal.component';
import { CustomDatePickerRange, DateRange } from '../../../shared/components/custom-datepicker-range/custom-datepicker-range';
import { CustomSelect } from '../../../shared/components/custom-select/custom-select';

export interface Empresa {
  value: number;
  label: string;
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
    ReactiveFormsModule,
    CustomSelect,
    CustomDatePickerRange,
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
    { value: 0, label: 'Todas as empresas' },
    { value: 1, label: '123 Milhas' },
    { value: 2, label: 'Tech Solutions' },
    { value: 3, label: 'Stark Industries' },
    { value: 4, label: 'Acme Corp' }
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

  public statusControl = new FormControl('todos');
  public empresaControl = new FormControl(0);

  public dateRange: DateRange = {
    startDate: '',
    endDate: ''
  };

  onDateRangeChange(range: DateRange): void {
    this.dateRange = range;
    this.filtros.dataInicio = range.startDate;
    this.filtros.dataFim = range.endDate;
  }

  public filtros = {
    empresaId: 0,
    status: 'todos',
    dataInicio: '',
    dataFim: '',
    periodo: 'todos'
  };

  ngOnInit(): void {
    this.filtros.periodo = 'mes';
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
    if (confirm(`Rejeitar saque de ${this.formatarValor(saque.valor)} para ${saque.solicitante}?`)) {
      saque.status = 'Rejeitado';
      saque.statusAprovador = 'rejeitado';
      this.cdRef.detectChanges();
    }
  }

  get saquesFiltrados(): Saque[] {
    let saques = this.saques;
    const empresaSelecionada = this.empresaControl?.value;
    if (empresaSelecionada && empresaSelecionada > 0) {
      saques = saques.filter(saque => saque.empresaId === empresaSelecionada);
    }
    
    // Filtro por status usando FormControl
    const statusSelecionado = this.statusControl?.value;
    if (statusSelecionado && statusSelecionado !== 'todos') {
      const filtroStatus = String(statusSelecionado).trim().toLowerCase();
      saques = saques.filter(saque => String(saque.status || '').trim().toLowerCase() === filtroStatus);
    }
    
    // Filtro por data de início
    if (this.dateRange.startDate !== '') {
      const inicio = new Date(this.dateRange.startDate);
      inicio.setHours(0, 0, 0, 0);
      saques = saques.filter(saque => saque.dataHora >= inicio);
    }
    
    // Filtro por data fim
    if (this.dateRange.endDate !== '') {
      const fim = new Date(this.dateRange.endDate);
      fim.setHours(23, 59, 59, 999);
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
