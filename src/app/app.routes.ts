import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { Pix } from './features/admin/pix/pix';
import { Wallets } from './features/wallets/wallets';
import { NewPassword } from './features/auth/new-password/new-password';
import { RecoveryPassword } from './features/auth/recovery-password/recovery-password';
import { Admin } from './features/admin/admin';
import { BankAccounts } from './features/admin/bank-accounts/bank-accounts';
import { BatchBank } from './features/admin/batch-bank/batch-bank';
import { Clients } from './features/admin/clients/clients';
import { Logs } from './features/admin/logs/logs';
import { Logs as LogsUser } from './features/admin/users/logs/logs';
import { Logs as LogsWallet } from './features/wallets/logs/logs';
import { Notifications } from './features/admin/notifications/notifications';
import { Users } from './features/admin/users/users';
import { Withdrawals } from './features/admin/withdrawals/withdrawals';
import { LinkCompanies } from './features/admin/users/link-companies/link-companies';
import { Credentials } from './features/admin/users/credentials/credentials';
import { Edit as EditUser } from './features/admin/users/edit/edit';
import { EditClient } from './features/admin/clients/edit/edit';
import { Edit as EditWallet } from './features/wallets/edit/edit';
import { List as ListClient } from './features/admin/clients/list/list';
import { List as ListPix } from './features/admin/pix/list/list';
import { List as ListWallet } from './features/wallets/list/list';
import { List as ListUser } from './features/admin/users/list/list';
import { New as NewPix } from './features/admin/pix/new/new';
import { New as NewWallet } from './features/wallets/new/new';
import { Profile } from './features/profile/profile';
import { MyCompany } from './features/profile/my-company/my-company';
import { MyData } from './features/profile/my-data/my-data';
import { Balance } from './features/wallets/balance/balance';
import { Deposit } from './features/wallets/deposit/deposit';
import { NewItemWallet } from './features/wallets/new-item-wallet/new-item-wallet';
import { Payment } from './features/wallets/payment/payment';
import { Extract } from './features/wallets/extract/extract';
import { SendPix } from './features/wallets/send-pix/send-pix';
import { TransferWallet } from './features/wallets/transfer-wallet/transfer-wallet';
import { Transfer } from './features/wallets/transfer/transfer';
import { Config } from './features/wallets/config/config';
import { Relatorios } from './features/relatorios/relatorios';
import { DepositoRelatorio } from './features/relatorios/deposito/deposito';
import { SaquesRelatorio } from './features/relatorios/saques/saques';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'recovery-password',
        component: RecoveryPassword,
      },
      {
        path: 'new-password',
        component: NewPassword,
      }
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'administracao',
        component: Admin,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/administracao/users',
          },
          {
            path: 'clients',
            children: [
              {
                path: '',
                component: ListClient,
                data: {
                  pageTitle: 'Clientes',
                  pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
                  breadcrumb: [
                    { label: 'Painel', path: '/dashboard' },
                    { label: 'Administração', path: '/administracao' },
                    { label: 'Clientes', path: '/administracao/clients' }
                  ],
                }
              },
              {
                path: 'edit/:id',
                component: EditClient,
              }
            ]
          },
          {
            path: 'users',
            children: [
              {
                path: '',
                component: ListUser,
                data: {
                  pageTitle: 'Usuários',
                  pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
                  breadcrumb: [
                    { label: 'Painel', path: '/dashboard' },
                    { label: 'Administração', path: '/administracao' },
                    { label: 'Usuários', path: '/administracao/users' }
                  ],
                  actionButton: {
                    show: true,
                    label: '+ Adicionar novo usuário',
                    icon: 'add'
                  }
                },
              },
              {
                path: 'edit/:id',
                component: EditUser,
              },
              {
                path: 'credentials/:id',
                component: Credentials,
              },
              {
                path: 'link-companies/:id',
                component: LinkCompanies,
              },
              {
                path: 'logs/:id',
                component: LogsUser,
              },
            ]
          },
          {
            path: 'pix',
            children: [
              {
                path: 'list',
                component: ListPix,
                data: {
                  pageTitle: 'Chaves PIX',
                  pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
                  breadcrumb: [
                    { label: 'Painel', path: '/dashboard' },
                    { label: 'Administração', path: '/administracao' },
                    { label: 'Chaves PIX', path: '/administracao/pix/list' }
                  ],
                  actionButton: {
                    show: true,
                    label: '+ Adicionar nova chave',
                    icon: 'add'
                  }
                }
              },
              {
                path: 'new',
                component: NewPix,
              },
            ],
          },
          {
            path: 'bank-accounts',
            component: BankAccounts,
            data: {
              pageTitle: 'Contas bancárias',
              pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Administração', path: '/administracao' },
                { label: 'Contas bancárias', path: '/administracao/bank-accounts' }
              ],
            }
          },
          {
            path: 'batch-bank',
            component: BatchBank,
            data: {
              pageTitle: 'Banco em lote',
              pageSubtitle: 'Texto complementar abaixo',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Administração', path: '/administracao' },
                { label: 'Banco em lote', path: '/administracao/batch-bank' }
              ],
            }
          },
          {
            path: 'logs',
            component: Logs,
            data: {
              pageTitle: 'Relatório de logs',
              pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Administração', path: '/administracao' },
                { label: 'Relatório de logs', path: '/administracao/logs' }
              ],
            }
          },
          {
            path: 'notifications',
            component: Notifications,
            data: {
              pageTitle: 'Notificações',
              pageSubtitle: 'Texto complementar abaixo',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Administração', path: '/administracao' },
                { label: 'Notificações', path: '/administracao/notifications' }
              ],
            }
          },
          {
            path: 'withdrawals',
            component: Withdrawals,
            data: {
              pageTitle: 'Aprovar Saques',
              pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Administração', path: '/administracao' },
                { label: 'Aprovar Saques', path: '/administracao/withdrawals' }
              ],
            }
          },
        ]
      },
      {
        path: 'pix',
        component: Pix,
      },
      {
        path: 'clients',
        component: Clients,
        children: [
          {
            path: 'edit',
            component: EditClient,
          },
        ],
      },
      {
        path: 'wallets',
        component: Wallets,
        children: [
          {
            path: '',
            component: ListWallet,
          },
          {
            path: 'new',
            component: NewWallet,
            data: {
              pageTitle: 'Wallets',
              pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Visualização', path: '/wallets/new' }
              ],
              actionButton: {
                show: true,
                label: '+ Adicionar nova carteira',
                icon: 'add'
              }
            }
          },
          {
            path: 'edit/:id',
            component: EditWallet,
            data: {
              pageTitle: 'Wallets',
              pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Visualização', path: '/wallets/edit' }
              ],
              actionButton: {
                show: true,
                label: '+ Adicionar nova carteira',
                icon: 'add'
              }
            }
          },
          {
            path: 'config/:id',
            component: Config,
            data: {
              pageTitle: 'Wallets',
              pageSubtitle: 'Você pode já enviar o pix pelo Internet Banking',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Visualização', path: '/wallets/edit' }
              ],
              actionButton: {
                show: true,
                label: '+ Adicionar nova carteira',
                icon: 'add'
              }
            }
          },
          {
            path: 'transfer',
            component: Transfer,
            data: {
              pageTitle: 'Transferência',
              pageSubtitle: 'Transfira dinheiro entre contas',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Transferência', path: '/wallets/transfer' }
              ],
            }
          },
          {
            path: 'balance',
            component: Balance,
            data: {
              pageTitle: 'Saldo',
              pageSubtitle: 'Consulte seu saldo',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Saldo', path: '/wallets/balance' }
              ],
            }
          },
          {
            path: 'deposit',
            component: Deposit,
            data: {
              pageTitle: 'Depósito',
              pageSubtitle: 'Faça um depósito em sua carteira',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Depósito', path: '/wallets/deposit' }
              ],
            }
          },
          {
            path: 'logs/:id',
            component: LogsWallet,
            data: {
              pageTitle: 'Logs da Carteira',
              pageSubtitle: 'Consulte os logs da sua carteira',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Logs', path: '/wallets/logs' }
              ],
            }
          },
          {
            path: 'new-item-wallet',
            component: NewItemWallet,
            data: {
              pageTitle: 'Novo Item na Carteira',
              pageSubtitle: 'Adicione um novo item à sua carteira',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Novo Item', path: '/wallets/new-item-wallet' }
              ],
            }
          },
          {
            path: 'payment',
            component: Payment,
            data: {
              pageTitle: 'Pagamento',
              pageSubtitle: 'Realize um pagamento',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Pagamento', path: '/wallets/payment' }
              ],
            }
          },
          {
            path: 'extract',
            component: Extract,
            data: {
              pageTitle: 'Extrato',
              pageSubtitle: 'Consulte seu extrato',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Extrato', path: '/wallets/extract' }
              ],
            }
          },
          {
            path: 'send-pix',
            component: SendPix,
            data: {
              pageTitle: 'Enviar PIX',
              pageSubtitle: 'Envie um PIX para qualquer conta',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Enviar PIX', path: '/wallets/send-pix' }
              ],
            }
          },
          {
            path: 'transfer-wallet',
            component: TransferWallet,
            data: {
              pageTitle: 'Transferência entre Carteiras',
              pageSubtitle: 'Transfira valores entre suas carteiras',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Wallets', path: '/wallets' },
                { label: 'Transferência entre Carteiras', path: '/wallets/transfer-wallet' }
              ],
            }
          },
        ],
      },
      {
        path: 'profile',
        component: Profile,
        children: [
          {
            path: 'my-data',
            component: MyData,
          },
          {
            path: 'my-company',
            component: MyCompany,
          },
        ],
      },
      {
        path: 'relatorios',
        component: Relatorios,
        children: [
          {
            path: '',
            redirectTo: 'deposito',
            pathMatch: 'full'
          },
          {
            path: 'deposito',
            component: DepositoRelatorio,
            data: {
              pageTitle: 'Relatório de Depósitos',
              pageSubtitle: 'Consulte os depósitos realizados',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Relatórios', path: '/relatorios' },
                { label: 'Depósitos', path: '/relatorios/deposito' }
              ],
            }
          },
          {
            path: 'saques',
            component: SaquesRelatorio,
            data: {
              pageTitle: 'Relatório de Saques',
              pageSubtitle: 'Consulte os saques realizados',
              breadcrumb: [
                { label: 'Painel', path: '/dashboard' },
                { label: 'Relatórios', path: '/relatorios' },
                { label: 'Saques', path: '/relatorios/saques' }
              ],
            }
          },
        ]
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];