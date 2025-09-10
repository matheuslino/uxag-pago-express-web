import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientSidebar } from '../../../shared/components/client-sidebar/client-sidebar';

@Component({
  selector: 'app-clients',
  imports: [
    RouterModule,
    ClientSidebar,
  ],
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients {

}
