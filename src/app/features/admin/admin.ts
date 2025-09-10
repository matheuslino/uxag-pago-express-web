import { Component } from '@angular/core';
import { AdminSidebar } from '../../shared/components/admin-sidebar/admin-sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    RouterModule,
    AdminSidebar
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {

}
