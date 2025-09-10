import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-sidebar',
  imports: [
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './client-sidebar.html',
  styleUrl: './client-sidebar.scss'
})
export class ClientSidebar {

}
