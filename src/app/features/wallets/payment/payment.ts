import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WalletSidebar } from '../../../shared/components/wallet-sidebar/wallet-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { FooterInfo } from '../../../shared/components/footer-info/footer-info';
import { CustomSelect } from '../../../shared/components/custom-select/custom-select';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    HeaderTitle,
    RouterModule,
    MatIconModule,
    WalletSidebar,
    FooterInfo,
    CustomSelect,
  ],
  templateUrl: './payment.html',
  styleUrl: './payment.scss'
})
export class Payment {

  public currentStep: number = 1;

  public clientList = [
    { value: '123 Milhas - 26.669.170/0001-57', label: '123 Milhas - 26.669.170/0001-57' },
    { value: 'Cliente 2', label: 'Cliente 2' }
  ];

  public walletList = [
    { value: '6671 - Padrão', label: '6671 - Padrão' },
    { value: 'Carteira 2', label: 'Carteira 2' }
  ];

  public paymentData = {
    cliente: '',
    carteira: '',
    linhaDigitavel: '',
    beneficiario: {
      nome: '',
      cpfCnpj: ''
    },
    pagador: {
      nome: '',
      cpfCnpj: ''
    },
    resumo: {
      bancoCedente: 'Banco Bradesco S.A.',
      instituicaoPagamento: '655 Banco Votorantim'
    },
    valores: {
      nominal: 1500.00,
      desconto: 0,
      multa: 0,
      juros: 0
    }
  };

  public clienteControl = new FormControl('');
  public walletControl = new FormControl('');

  public headerInformation = {
    pageTitle: 'Pagamento',
    pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/admin' },
      { label: 'Saques', path: '/admin/withdrawals' }
    ],
    saldo: 0,
  };
  
  // --- Footer Properties ---
  public footerInformation: string = 'Boleto';
  public footerContext: string = 'Pagamento de boleto';
  public footerLabel: string = 'Informe o código de barras para o pagamento';
  public confirmSubmitLabel: string = 'Prosseguir';
  public confirmCancelLabel: string = 'Cancelar';

  constructor(private location: Location) { }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.updateFooter();
    } else {
      this.confirmPayment();
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateFooter();
    } else {
      this.location.back();
    }
  }

  onSubmit(): void {
    this.nextStep();
  }

  onCancel(): void {
    this.previousStep();
  }

  confirmPayment(): void {
    console.log('Pagamento confirmado:', this.paymentData);
    alert('Pagamento enviado para processamento!');
    // Aqui iria a lógica para submeter os dados e resetar o estado.
  }

  updateFooter(): void {
    switch (this.currentStep) {
      case 1:
        this.footerInformation = 'Boleto';
        this.footerContext = 'Pagamento de boleto:';
        this.footerLabel = 'Informe o código de barras para o pagamento';
        this.confirmSubmitLabel = 'Prosseguir';
        this.confirmCancelLabel = 'Cancelar';
        break;
      case 2:
        this.footerInformation = 'Confirmação';
        this.footerContext = 'Dados do boleto:';
        this.footerLabel = 'Faça as alterações se necessário';
        this.confirmSubmitLabel = 'Prosseguir';
        this.confirmCancelLabel = 'Voltar';
        break;
      case 3:
        this.footerInformation = 'Revisão';
        this.footerContext = 'Revisão e confirmação:';
        this.footerLabel = 'Analise os dados e confirme o pagamento';
        this.confirmSubmitLabel = 'Confirmar';
        this.confirmCancelLabel = '';
        break;
    }
  }
}