import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordChangeRequest, User } from '../../../interface/user.interface';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-password-change-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.scss']
})
export class PasswordChangeModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<PasswordChangeModalComponent>);

  passwordForm!: FormGroup;
  currentUser: User | null = null;
  isLoading = false;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCurrentUser();
  }

  private initializeForm(): void {
    this.passwordForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) {
      return null;
    }

    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  private loadCurrentUser(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar usuário:', error);
        this.snackBar.open('Erro ao carregar dados do usuário', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  formatIdentification(identification: string): string {
    // Formata como CPF: 000.***.**0-**
    const cleaned = identification.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})\d{3}\d{2}(\d{2})/, '$1.***.**$2-**');
  }

  formatPhone(phone: string): string {
    // Formata como: (11) 98230-2931
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.isLoading = true;

      const passwordData: PasswordChangeRequest = {
        currentPassword: '', // Não solicitamos a senha atual neste modal
        newPassword: this.passwordForm.value.newPassword,
        confirmPassword: this.passwordForm.value.confirmPassword
      };

      this.userService.changePassword(passwordData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.snackBar.open('Senha alterada com sucesso!', 'Fechar', {
              duration: 100,
              panelClass: ['success-snackbar']
            });
            this.dialogRef.close(true);
          } else {
            this.snackBar.open(response.message || 'Erro ao alterar senha', 'Fechar', {
              duration: 100,
              panelClass: ['error-snackbar']
            });
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erro ao alterar senha:', error);
          this.snackBar.open('Erro interno. Tente novamente.', 'Fechar', {
            duration: 100,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}