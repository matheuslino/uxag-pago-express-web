import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { Wallets } from './features/wallets/wallets';
import { NewPassword } from './features/auth/new-password/new-password';
import { RecoveryPassword } from './features/auth/recovery-password/recovery-password';
import { Admin } from './features/admin/admin';
import { BankAccounts } from './features/admin/bank-accounts/bank-accounts';
import { BatchBank } from './features/admin/batch-bank/batch-bank';
import { Logs } from './features/admin/logs/logs';
import { Logs as LogsUser } from './features/admin/users/logs/logs';
import { Logs as LogsWallet } from './features/wallets/logs/logs';
import { Notifications } from './features/admin/notifications/notifications';
import { Notifications as NotificationClient } from './features/admin/clients/notifications/notifications';
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
import { ProfileComponent } from './features/profile/profile';
import { MyCompany } from './features/profile/my-company/my-company';
import { MyData } from './features/profile/my-data/my-data';
import { Balance } from './features/wallets/balance/balance';
import { Deposit } from './features/wallets/deposit/deposit';
import { Deposit as DepositClient } from './features/transactions/deposit/deposit';
import { NewItemWallet } from './features/wallets/new-item-wallet/new-item-wallet';
import { Payment } from './features/wallets/payment/payment';
import { Payment as PaymentClient } from './features/transactions/payment/payment';
import { Extract } from './features/wallets/extract/extract';
import { SendPix } from './features/wallets/send-pix/send-pix';
import { TransferWallet } from './features/wallets/transfer-wallet/transfer-wallet';
import { Transfer } from './features/wallets/transfer/transfer';
import { Config } from './features/wallets/config/config';
import { Relatorios } from './features/relatorios/relatorios';
import { DepositoRelatorio } from './features/relatorios/deposito/deposito';
import { SaquesRelatorio } from './features/relatorios/saques/saques';
import { Modals } from './features/admin/modals/modals';
import { Transactions } from './features/transactions/transactions';

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
            redirectTo: '/administracao/bank-accounts',
          },
          {
            path: 'clients',
            children: [
              {
                path: '',
                component: ListClient,
              },
              {
                path: 'edit/:id',
                component: EditClient,
              },
              {
                path: 'notifications/:id',
                component: NotificationClient,
              },
            ]
          },
          {
            path: 'users',
            children: [
              {
                path: '',
                component: ListUser,
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
          },
          {
            path: 'batch-bank',
            component: BatchBank,
          },
          {
            path: 'logs',
            component: Logs,
          },
          {
            path: 'notifications',
            component: Notifications,
          },
          {
            path: 'withdrawals',
            component: Withdrawals,
          },
          {
            path: 'modals',
            component: Modals,
          },
        ]
      },
      {
        path: 'carteira',
        component: Wallets,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/carteira/wallets',
          },
          {
            path: 'wallets',
            children: [
              {
                path: '',
                component: ListWallet,
              },
              {
                path: 'new',
                component: NewWallet,
              },
              {
                path: 'edit/:id',
                component: EditWallet,
                runGuardsAndResolvers: 'always'   
              },
              {
                path: 'config/:id',
                component: Config,
              },
              {
                path: 'logs/:id',
                component: LogsWallet,
              },
            ]
          },
          {
            path: 'transfer',
            component: Transfer,
          },
          {
            path: 'balance',
            component: Balance,
          },
          {
            path: 'deposit',
            component: Deposit,
          },
          {
            path: 'new-item-wallet',
            component: NewItemWallet,
          },
          {
            path: 'payment',
            component: Payment,
          },
          {
            path: 'extract',
            component: Extract,
          },
          {
            path: 'send-pix',
            component: SendPix,
          },
          {
            path: 'transfer-wallet',
            component: TransferWallet,
          },
        ],
      },
      {
        path: 'transacoes',
        component: Transactions,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/transacoes/deposit',
          },
          {
            path: 'payment',
            component: PaymentClient,
          },
          {
            path: 'deposit',
            component: DepositClient,
          },
        ]
      },
      {
        path: 'perfil',
        component: ProfileComponent,
        children: [
          {
            path: '',
            redirectTo: '/perfil/my-data',
            pathMatch: 'full'
          },
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
            redirectTo: '/relatorios/withdrawals',
            pathMatch: 'full'
          },
          {
            path: 'deposits',
            component: DepositoRelatorio,
          },
          {
            path: 'withdrawals',
            component: SaquesRelatorio,
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
