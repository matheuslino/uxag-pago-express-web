import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wallet-sidebar',
  imports: [
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './wallet-sidebar.html',
  styleUrl: './wallet-sidebar.scss'
})
export class WalletSidebar {

}
