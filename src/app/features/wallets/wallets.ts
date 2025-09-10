import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WalletSidebar } from '../../shared/components/wallet-sidebar/wallet-sidebar';

@Component({
  selector: 'app-wallets',
  imports: [
    RouterModule,
    WalletSidebar,
  ],
  templateUrl: './wallets.html',
  styleUrl: './wallets.scss'
})
export class Wallets {

}
