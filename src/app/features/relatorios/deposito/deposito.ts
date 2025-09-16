import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { RelatoriosSidebar } from '../../../shared/components/relatorios-sidebar/relatorios-sidebar.component';

@Component({
  selector: 'app-deposito-relatorio',
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
  templateUrl: './deposito.html',
  styleUrls: ['./deposito.scss']
})
export class DepositoRelatorio {
  public usuarioId: number | undefined;

  reportForm!: FormGroup;
  private subscription = new Subscription();
  reportMenu: string = 'deposits';
  nomeUsuarioAtual = '';
  empresaUsuarioAtual = '';
  formDataAtual: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.usuarioId = Number(params.get('id') || '0');
    });
    this.initializeForm();
  }

  private initializeForm() {
    this.reportForm = this.fb.group({
      dateInit: [''],
      dateFinal: [''],
      razaoSocial: ['',],
      wallet: ['',],
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  registros = [
    { data: '10/06/2024', total: 'R$ 9,90' },
    { data: '19/06/2024', total: 'R$ 9,90' }
  ];

  public headerInformation = {
    pageTitle: 'Valor total por mês - Cashin',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Relatórios', path: '/relatorios' },
      { label: 'Depósitos', path: '/relatorios/deposit' }
    ],
  }
}