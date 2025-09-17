import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../../shared/components/header/header';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderTitle,
    WalletSidebar,
    FooterInfo,

  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {

  public sendLabel: string = 'Enviar';
  public footerInformation: string = '001';
  public footerContext: string = 'Casteira Oficial';
  public footerLabel: string = '';
  public isModalVisible = false;

  public walletId: number | undefined;
  walletMenu: string = 'wallet';

  public razaoSocial: string = '123 Milhas';
  public apelido: string = 'Default';
  public numeroCarteira: string = '11897';
  public valor: string = '0,00';

  public headerInformation = {
    pageTitle: 'Wallets',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Wallets', path: '/wallets' },
      { label: 'Visualização', path: '/wallets/new' }
    ],
    actionButton: {
      actionLabel: '+ Adicionar nova carteira',
      disabled: false,
      onClick: () => {
        this.router.navigate(['/wallets/new']);
      }
    }
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.walletId = Number(params.get('id') || '0');
    });
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.openConfirmationModal();
  }

  openConfirmationModal(): void {
    if (this.razaoSocial) {
      this.isModalVisible = true;
    } else {
      alert('Por favor, preencha a Chave PIX e o Valor.');
    }
  }


}