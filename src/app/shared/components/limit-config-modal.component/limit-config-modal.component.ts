import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { LimitConfigService } from '../../../services/limit-config.service';
import { LimitConfig, Company } from '../../../interface/limit-config.interface';

@Component({
  selector: 'app-limit-config-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  templateUrl: './limit-config-modal.component.html',
  styleUrl: './limit-config-modal.component.scss',
})
export class LimitConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private limitService = inject(LimitConfigService);
  private dialogRef = inject(MatDialogRef<LimitConfigModalComponent>);

  selectedCompany = signal<Company | null>(null);
  limits = signal<LimitConfig[]>([]);
  isLoading = signal(false);
  isAdding = signal(false);

  limitForm: FormGroup;
  displayedColumns: string[] = ['createdAt', 'createdBy', 'dailyLimit', 'monthlyLimit'];

  constructor() {
    this.limitForm = this.fb.group({
      dailyLimit: ['', [Validators.required, Validators.min(1)]],
      monthlyLimit: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.limitService.getCompanies().subscribe(companies => {
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
        this.loadLimits(companies[0].id);
      }
    });
  }

  private loadLimits(companyId: string) {
    this.isLoading.set(true);
    this.limitService.getLimits(companyId).subscribe(limits => {
      this.limits.set(limits);
      this.isLoading.set(false);
    });
  }

  onAddLimit() {
    if (this.limitForm.valid && this.selectedCompany()) {
      const { dailyLimit, monthlyLimit } = this.limitForm.value;
      this.isAdding.set(true);
      this.limitService.addLimit(dailyLimit, monthlyLimit, this.selectedCompany()!.id, 'current_user').subscribe(newLimit => {
        this.limits.set([...this.limits(), newLimit]);
        this.limitForm.reset();
        this.isAdding.set(false);
      });
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }

  onClose() {
    this.dialogRef.close();
  }
}
