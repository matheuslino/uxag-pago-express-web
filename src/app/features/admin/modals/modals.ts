import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderTitle } from '../../../shared/components/header-title/header-title';
import { AdminSidebar } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AlertConfigModalComponent } from '../../../shared/components/alert-config-modal.component/alert-config-modal.component';
import { BankConfigModalComponent } from '../../../shared/components/bank-config-modal/bank-config-modal';
import { BoletoFeeConfigModalComponent } from '../../../shared/components/boleto-tax-config-modal/boleto-tax-config-modal.component';
import { CertificateModalComponent } from '../../../shared/components/certificate-modal.component/certificate-modal.component';
import { ConfirmDeactivateModalComponent } from '../../../shared/components/confirm-deactivate-modal.component/confirm-deactivate-modal.component';
import { CreditCardFeesModalComponent } from '../../../shared/components/credit-card-fees-modal.component/credit-card-fees-modal.component';
import { EmailConfigModalComponent } from '../../../shared/components/email-config-modal.component/email-config-modal.component';
import { IntegrationConfigModalComponent } from '../../../shared/components/integration-config-modal/integration-config-modal.component';
import { IpConfigModalComponent } from '../../../shared/components/ip-permission-modal/ip-permission-modal.component';
import { LimitConfigModalComponent } from '../../../shared/components/limit-config-modal.component/limit-config-modal.component';
import { LimitPaymentFeeConfigModalComponent } from '../../../shared/components/limit-payment-tax-config-modal/limit-payment-tax-config-modal';
import { PaymentLimitModalComponent } from '../../../shared/components/payment-limit-modal/payment-limit-modal.component';
import { PixFeeConfigModalComponent } from '../../../shared/components/pix-fee-config-modal.component/pix-fee-config-modal.component';
import { PixLimitsModalComponent } from '../../../shared/components/pix-limits-modal/pix-limits-modal.component';
import { PixWalletConfigModalComponent } from '../../../shared/components/pix-tax-config-modal/pix-tax-config-modal';
import { ReturnFeeConfigModalComponent } from '../../../shared/components/return-tax-config-modal/return-tax-config-modal';
import { SplitFeeConfigModalComponent } from '../../../shared/components/split-tax-config-modal/sprit-tax-config-modal.component';
import { TransactionConfigModalComponent } from '../../../shared/components/transaction-config-modal/transaction-config-modal';
import { TransferConfigModalComponent } from '../../../shared/components/transfer-config-modal/transfer-config-modal';
import { WalletTransferConfigModalComponent1 } from '../../../shared/components/wallet-transfer-config-modal-1/wallet-transfer-config-modal';
import { WalletTransferConfigModalComponent } from '../../../shared/components/wallet-transfer-config-modal-2/wallet-transfer-config-modal';
import { WithdrawalFeeConfigModalComponent } from '../../../shared/components/withdrawal-fee-config-modal/withdrawal-fee-config-modal.component';

interface ModalInfo {
  id: string;
  name: string;
  description: string;
  component: any;
  category: string;
}

@Component({
  selector: 'app-modals',
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    AdminSidebar,
    HeaderTitle,
    CommonModule,
  ],
  templateUrl: './modals.html',
  styleUrl: './modals.scss'
})
export class Modals {
  public headerInformation = {
    pageTitle: 'Modais do Sistema',
    pageSubtitle: 'Visualize e teste todos os modais disponíveis no sistema',
    breadcrumb: [
      { label: 'Painel', path: '/dashboard' },
      { label: 'Administração', path: '/administracao' },
      { label: 'Modais', path: '/administracao/modals' }
    ],
  }

  public modals: ModalInfo[] = [
    {
      id: 'alert-config',
      name: 'Configuração de Alertas',
      description: 'Modal para configuração de alertas e notificações do sistema',
      component: AlertConfigModalComponent,
      category: 'Configuração'
    },
    {
      id: 'bank-config',
      name: 'Configuração de Banco',
      description: 'Configuração de dados bancários e informações de conta',
      component: BankConfigModalComponent,
      category: 'Configuração'
    },
    {
      id: 'boleto-tax-config',
      name: 'Configuração de Taxa de Boleto',
      description: 'Modal para configuração de taxas de boleto',
      component: BoletoFeeConfigModalComponent,
      category: 'Taxas'
    },
    {
      id: 'certificate',
      name: 'Certificado',
      description: 'Modal para gerenciamento de certificados',
      component: CertificateModalComponent,
      category: 'Segurança'
    },
    {
      id: 'confirm-deactivate',
      name: 'Confirmar Desativação',
      description: 'Modal de confirmação para desativação',
      component: ConfirmDeactivateModalComponent,
      category: 'Confirmação'
    },
    {
      id: 'credit-card-fees',
      name: 'Taxas de Cartão de Crédito',
      description: 'Modal para configuração de taxas de cartão de crédito',
      component: CreditCardFeesModalComponent,
      category: 'Taxas'
    },
    {
      id: 'email-config',
      name: 'Configuração de Email',
      description: 'Modal para configuração de email',
      component: EmailConfigModalComponent,
      category: 'Configuração'
    },
    {
      id: 'integration-config',
      name: 'Configuração de Integração',
      description: 'Modal para configuração de integrações',
      component: IntegrationConfigModalComponent,
      category: 'Configuração'
    },
    {
      id: 'ip-permission',
      name: 'Permissão de IP',
      description: 'Modal para gerenciamento de permissões de IP',
      component: IpConfigModalComponent,
      category: 'Segurança'
    },
    {
      id: 'limit-config',
      name: 'Configuração de Limites',
      description: 'Modal para configuração de limites do sistema',
      component: LimitConfigModalComponent,
      category: 'Configuração'
    },
    {
      id: 'limit-payment-tax',
      name: 'Taxa de Limite de Pagamento',
      description: 'Modal para configuração de taxas de limite de pagamento',
      component: LimitPaymentFeeConfigModalComponent,
      category: 'Taxas'
    },
    {
      id: 'payment-limit',
      name: 'Limite de Pagamento',
      description: 'Modal para configuração de limites de pagamento',
      component: PaymentLimitModalComponent,
      category: 'Limites'
    },
    {
      id: 'pix-fee-config',
      name: 'Configuração de Taxa PIX',
      description: 'Modal para configuração de taxas PIX',
      component: PixFeeConfigModalComponent,
      category: 'Taxas'
    },
    {
      id: 'pix-limits',
      name: 'Limites PIX',
      description: 'Modal para configuração de limites PIX',
      component: PixLimitsModalComponent,
      category: 'Limites'
    },
    {
      id: 'pix-tax-config',
      name: 'Configuração de Taxa PIX',
      description: 'Modal para configuração de taxas PIX',
      component: PixWalletConfigModalComponent,
      category: 'Taxas'
    },
    {
      id: 'return-tax-config',
      name: 'Configuração de Taxa de Retorno',
      description: 'Modal para configuração de taxas de retorno',
      component: ReturnFeeConfigModalComponent,
      category: 'Taxas'
    },
    {
      id: 'split-tax-config',
      name: 'Configuração de Taxa de Split',
      description: 'Modal para configuração de taxas de split',
      component: SplitFeeConfigModalComponent,
      category: 'Taxas'
    },
    {
      id: 'transaction-config',
      name: 'Configuração de Transação',
      description: 'Modal para configuração de transações',
      component: TransactionConfigModalComponent,
      category: 'Configuração'
    },
    {
      id: 'transfer-config',
      name: 'Configuração de Transferência',
      description: 'Modal para configuração de transferências',
      component: TransferConfigModalComponent,
      category: 'Configuração'
    },
    {
      id: 'wallet-transfer-config-1',
      name: 'Configuração de Transferência de Carteira 1',
      description: 'Modal para configuração de transferência de carteira (versão 1)',
      component: WalletTransferConfigModalComponent1,
      category: 'Carteira'
    },
    {
      id: 'wallet-transfer-config-2',
      name: 'Configuração de Transferência de Carteira 2',
      description: 'Modal para configuração de transferência de carteira (versão 2)',
      component: WalletTransferConfigModalComponent,
      category: 'Carteira'
    },
    {
      id: 'withdrawal-fee-config',
      name: 'Configuração de Taxa de Saque',
      description: 'Modal para configuração de taxas de saque',
      component: WithdrawalFeeConfigModalComponent,
      category: 'Taxas'
    }
  ];

  public filteredModals: ModalInfo[] = this.modals;
  public selectedCategory: string = 'all';

  constructor(private dialog: MatDialog) {}

  public getCategories(): string[] {
    const categories = [...new Set(this.modals.map(modal => modal.category))];
    return ['all', ...categories];
  }

  public filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredModals = this.modals;
    } else {
      this.filteredModals = this.modals.filter(modal => modal.category === category);
    }
  }

  public openModal(modal: ModalInfo): void {
    this.dialog.open(modal.component, {
      width: '80%',
      maxWidth: '800px',
      data: {
        title: modal.name,
        description: modal.description
      }
    });
  }
}
