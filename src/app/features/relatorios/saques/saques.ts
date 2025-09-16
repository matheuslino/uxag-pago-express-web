import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { RelatoriosSidebar } from '../../../shared/components/relatorios-sidebar/relatorios-sidebar.component';
import { debounceTime, startWith } from 'rxjs/operators';

interface SaqueRecord {
  data: string;
  total: string;
  razaoSocial: string;
  carteira: string;
}

@Component({
  selector: 'app-saques-relatorio',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    RelatoriosSidebar,
    HeaderTitle,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './saques.html',
  styleUrls: ['./saques.scss']
})
export class SaquesRelatorio implements OnInit, OnDestroy {
  public usuarioId: number | undefined;

  reportForm!: FormGroup;
  private subscription = new Subscription();
  reportMenu: string = 'withdrawals';
  
  wallets = ['Carteira Principal', 'Carteira Secundária', 'Carteira de Investimentos'];

  allRegistros: SaqueRecord[] = [
    { data: '10/06/2024', total: 'R$ 9,90', razaoSocial: 'Empresa A', carteira: 'Carteira Principal' },
    { data: '19/06/2024', total: 'R$ 15,50', razaoSocial: 'Empresa B', carteira: 'Carteira Secundária' },
    { data: '01/07/2024', total: 'R$ 22,00', razaoSocial: 'Empresa C', carteira: 'Carteira Principal' },
    { data: '15/07/2024', total: 'R$ 30,00', razaoSocial: 'Empresa A', carteira: 'Carteira de Investimentos' },
    { data: '28/07/2024', total: 'R$ 5,20', razaoSocial: 'Empresa D', carteira: 'Carteira Secundária' },
    { data: '05/08/2024', total: 'R$ 100,00', razaoSocial: 'Empresa B', carteira: 'Carteira Principal' },
    { data: '12/08/2024', total: 'R$ 45,80', razaoSocial: 'Empresa E', carteira: 'Carteira de Investimentos' },
    { data: '21/08/2024', total: 'R$ 78,10', razaoSocial: 'Empresa A', carteira: 'Carteira Principal' },
    { data: '03/09/2024', total: 'R$ 12,00', razaoSocial: 'Empresa C', carteira: 'Carteira Secundária' },
    { data: '15/09/2024', total: 'R$ 99,99', razaoSocial: 'Empresa D', carteira: 'Carteira Principal' }
  ];

  registros: SaqueRecord[] = [];

  public headerInformation = {
    pageTitle: 'Valor total por mês - Cashout',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Relatórios', path: '/relatorios' },
      { label: 'Saques', path: '/relatorios/withdrawals' }
    ],
    values: {
      value: 'R$ 189,000',
      percentage: '7%',
      filterDays: 7,
    },
    actionButton: {
      actionLabel: 'movimentar',
      disabled: false,
      onClick: () => {}
    },
    actionButton2: {
      actionLabel: 'exportar',
      disabled: false,
      onClick: () => {}
    }
  };

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.registros = this.allRegistros;

    this.subscription.add(
      this.reportForm.valueChanges.pipe(
        startWith(this.reportForm.value),
        debounceTime(300)
      ).subscribe(values => {
        this.applyFilters(values);
      })
    );
  }

  private initializeForm() {
    this.reportForm = this.fb.group({
      dateInit: [''],
      dateFinal: [''],
      razaoSocial: [''],
      wallet: [''],
    });
  }

  private applyFilters(filters: any) {
    let filteredData = [...this.allRegistros];

    if (filters.razaoSocial) {
      filteredData = filteredData.filter(item =>
        item.razaoSocial.toLowerCase().includes(filters.razaoSocial.toLowerCase())
      );
    }

    if (filters.wallet) {
      filteredData = filteredData.filter(item => item.carteira === filters.wallet);
    }

    if (filters.dateInit && filters.dateFinal) {
      const startDate = new Date(filters.dateInit);
      const endDate = new Date(filters.dateFinal);
      
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);

      filteredData = filteredData.filter(item => {
        const itemDateParts = item.data.split('/');
        const itemDate = new Date(+itemDateParts[2], +itemDateParts[1] - 1, +itemDateParts[0]);
        itemDate.setUTCHours(0,0,0,0);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    this.registros = filteredData;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}