import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
};

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './new-password.html',
  styleUrl: './new-password.scss'
})
export class NewPassword implements OnInit {
  isPasswordReset = false;
  newPasswordForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  passwordRequirements = {
    length: false,
    uppercase: false,
    number: false,
    specialChar: false
  };

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const passwordValidators = [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/[A-Z]/),      // Pelo menos uma letra maiúscula
      Validators.pattern(/[0-9]/),      // Pelo menos um número
      Validators.pattern(/[\W_]/)     // Pelo menos um caractere especial
    ];

    this.newPasswordForm = this.fb.group({
      password: ['', passwordValidators],
      confirmPassword: ['', [Validators.required]],
    }, { validators: passwordMatchValidator });

    this.passwordControl?.valueChanges.subscribe(value => {
      this.updatePasswordRequirements(value);
    });
  }

  get passwordControl() { return this.newPasswordForm.get('password'); }
  get confirmPasswordControl() { return this.newPasswordForm.get('confirmPassword'); }

  updatePasswordRequirements(password: string): void {
    this.passwordRequirements.length = password.length >= 8 && password.length <= 20;
    this.passwordRequirements.uppercase = /[A-Z]/.test(password);
    this.passwordRequirements.number = /[0-9]/.test(password);
    this.passwordRequirements.specialChar = /[\W_]/.test(password);
  }

  onSubmit(): void {
    if (this.newPasswordForm.valid) {
      console.log('Senha redefinida com sucesso!');
      this.isPasswordReset = true;
      // Após 3 segundos na tela de sucesso, redireciona para o login
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 3000);
    } else {
      this.newPasswordForm.markAllAsTouched();
    }
  }
}