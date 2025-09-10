import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.html',
  styleUrls: ['./recovery-password.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class RecoveryPassword implements OnInit {
  isCodeSent = false;
  hasError = false;
  private readonly correctCode = '30595';

  emailForm!: FormGroup;
  codeForm!: FormGroup;

  get emailControl(): AbstractControl | null {
    return this.emailForm.get('email');
  }

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.codeForm = this.fb.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
    });
  }

  sendEmail(): void {
    this.isCodeSent = true;
    this.hasError = false;
  }

  verifyCode(): void {
    if (this.codeForm.invalid) {
      return;
    }
    
    const formValues = this.codeForm.value;
    const enteredCode = `${formValues.digit1}${formValues.digit2}${formValues.digit3}${formValues.digit4}${formValues.digit5}`;

    if (enteredCode === this.correctCode) {
      this.hasError = false;
      this.router.navigate(['/auth/new-password']);
    } else {
      this.hasError = true;
      this.codeForm.reset();
    }
  }

  resendCode(): void {
    this.isCodeSent = false;
    this.hasError = false;
    this.emailForm.reset();
  }

  moveToNext(event: any, nextInput: HTMLInputElement | null): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === input.maxLength && nextInput) {
      nextInput.focus();
    }
  }
}