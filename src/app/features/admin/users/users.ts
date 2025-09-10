import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserSidebar } from '../../../shared/components/user-sidebar/user-sidebar';

@Component({
  selector: 'app-users',
  imports: [
    RouterModule,
    UserSidebar
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

}
