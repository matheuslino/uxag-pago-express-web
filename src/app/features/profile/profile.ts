import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { ProfileSidebarComponent } from '../../shared/components/profile-sidebar/profile-sidebar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  standalone: true,
  imports: [RouterModule, Header, ProfileSidebarComponent]
})
export class ProfileComponent {

}