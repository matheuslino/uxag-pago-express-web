import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CookieService } from 'ngx-cookie-service';

interface SavedUser {
  Nome: string;
  Id: number;
  Token: string;
  AvatarBse64?: string; 
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  showUserList = false;
  savedUsers: SavedUser[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.cookieService.check('savedUsers')) {
      this.savedUsers = JSON.parse(this.cookieService.get('savedUsers'));
      if (this.savedUsers.length > 0) {
        this.showUserList = true;
      }
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      
      const newUser: SavedUser = {
        Nome: 'Anitelli',
        Id: Date.now(),
        Token: btoa(email + ':' + password),
      };

      if (this.cookieService.check('savedUsers')) {
        this.savedUsers = JSON.parse(this.cookieService.get('savedUsers'));
      }
      this.savedUsers.push(newUser);
      this.cookieService.set('savedUsers', JSON.stringify(this.savedUsers));

      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }, 1500);
    }
  }

  selectUser(user: SavedUser): void {
    this.isLoading = true;
    console.log('Entrando como:', user.Nome);
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  removeUser(userToRemove: SavedUser): void {
    this.savedUsers = this.savedUsers.filter(user => user.Id !== userToRemove.Id);
    this.cookieService.set('savedUsers', JSON.stringify(this.savedUsers));
    if (this.savedUsers.length === 0) {
      this.showUserList = false;
    }
  }

  getAvatar(user: SavedUser): string {
    if (user.AvatarBse64) {
      return user.AvatarBse64;
    }
    return 'assets/images/avatar_login.png';
  }
}