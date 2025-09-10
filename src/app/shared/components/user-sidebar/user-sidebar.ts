import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  imports: [
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './user-sidebar.html',
  styleUrl: './user-sidebar.scss'
})
export class UserSidebar {

}
