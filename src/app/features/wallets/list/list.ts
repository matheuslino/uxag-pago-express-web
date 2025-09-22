import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { MatIconModule } from '@angular/material/icon';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { Subject, takeUntil } from 'rxjs';
import { Empresa, WalletService } from '../../../services/wallet.service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderTitle,
    RouterModule,
    MatIconModule,
    WalletSidebar,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public empresas: Empresa[] = [];
  public empresasFiltradas: Empresa[] = [];
  public carregando = false;

  public filtroRazaoSocial: string = '';
  public filtroNumeroCarteira: string = '';
  public filtroApelido: string = '';

  public headerInformation: any;

  public menuAbertoIndex: number | null = null;
  constructor(
    private router: Router,
    private walletService: WalletService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // agora o this já existe corretamente
    this.headerInformation = {
      pageTitle: 'Wallets',
      pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
      breadcrumb: [
        { label: 'Painel', path: '/dashboard' },
        { label: 'Wallets', path: '/wallets' },
        { label: 'Visualização', path: '/wallets/list' }
      ],
      actionButton: {
        actionLabel: '+ Adicionar nova carteira',
        disabled: false,
        onClick: () => this.adicionarNovaCarteira()
      }
    };

    this.carregarDados();
  }

  public adicionarNovaCarteira(): void {
    this.router.navigate(['/carteira/wallets/new']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  /**
  
  
  
  Carrega dados do service
  */
  private carregarDados(): void {
    this.carregando = true;


    this.walletService.getEmpresas()

      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (empresas) => {
          this.empresas = empresas;
          this.aplicarFiltros();
          this.carregando = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao carregar empresas:', error);
          this.carregando = false;
        }
      });

  }


  public toggleMenu(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.menuAbertoIndex = this.menuAbertoIndex === index ? null : index;
  }

  public fecharMenu(): void {
    this.menuAbertoIndex = null;
  }

  public editar(empresa: Empresa): void {
    this.router.navigate(['/carteira/wallets/edit', empresa.id]);
    this.fecharMenu();
  }

  public configurar(empresa: Empresa): void {
    this.router.navigateByUrl(`/carteira/wallets/config/${empresa.id}`);
    this.fecharMenu();
  }

  public verLogs(empresa: Empresa): void {
    this.router.navigateByUrl(`/carteira/wallets/logs/${empresa.id}`);
    this.fecharMenu();
  }

  /**
   * Aplica filtros na lista de empresas
   */
  public aplicarFiltros(): void {
    this.empresasFiltradas = this.empresas.filter(empresa =>
      this.filtrarPorRazaoSocial(empresa) &&
      this.filtrarPorNumeroCarteira(empresa) &&
      this.filtrarPorApelido(empresa)
    );
  }

  private filtrarPorRazaoSocial(empresa: Empresa): boolean {
    return !this.filtroRazaoSocial ||
      empresa.razaoSocial.toLowerCase().includes(this.filtroRazaoSocial.toLowerCase());
  }

  private filtrarPorNumeroCarteira(empresa: Empresa): boolean {
    return !this.filtroNumeroCarteira ||
      empresa.numeroCarteira.includes(this.filtroNumeroCarteira);
  }

  private filtrarPorApelido(empresa: Empresa): boolean {
    return !this.filtroApelido ||
      empresa.apelido.toLowerCase().includes(this.filtroApelido.toLowerCase());
  }

  /**
   * Limpa todos os filtros aplicados
   */
  public limparFiltros(): void {
    this.filtroRazaoSocial = '';
    this.filtroNumeroCarteira = '';
    this.filtroApelido = '';
    this.aplicarFiltros();
  }
}