import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';
import { CommonModule, Location } from '@angular/common';
import { Empresa, EmpresaService } from '../../../services/empresa.service';

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

  public sendLabel: string = 'Salvar';
  public footerInformation: string = '';
  public footerContext: string = '';
  public footerLabel: string = '';
  public isModalVisible = false;

  public walletId: number | undefined;
  walletMenu: string = 'wallet';

  // dados da empresa selecionada
  public empresa: Empresa | undefined;

  // bind para os inputs
  public razaoSocial: string = '';
  public apelido: string = '';
  public numeroCarteira: string = '';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.walletId = Number(params.get('id') || '0');
      this.empresa = this.empresaService.getEmpresaById(this.walletId);

      if (this.empresa) {
        this.razaoSocial = this.empresa.razaoSocial;
        this.apelido = this.empresa.apelido;
        this.numeroCarteira = this.empresa.numeroCarteira;

        // ajustar o footer de acordo com os dados
        this.footerInformation = `#${this.empresa.id} - ${this.empresa.razaoSocial}`;
        this.footerContext = this.empresa.apelido;
      }
    });
  }

  onCancel(): void {
    this.location.back();
  }

  onSubmit(): void {
    // aqui você poderia salvar no service/DB
    this.location.back();
  }
}
