import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
 MatSidenavModule
} from '@angular/material/sidenav';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule,
    Header,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayout {

}
