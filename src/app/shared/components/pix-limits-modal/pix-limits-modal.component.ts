import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';
import { PixLimitsService } from '../../../services/pix-limits.service';
import { Company, PixLimits } from '../../../interface/pix-limits.interface';

@Component({
    selector: 'app-pix-limits-modal',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './pix-limits-modal.component.html',
    styleUrls: ['./pix-limits-modal.component.scss', '../transaction-config-modal/transaction-config-modal.scss']
})
export class PixLimitsModalComponent implements OnInit {
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<PixLimitsModalComponent>);
    private pixLimitsService = inject(PixLimitsService);

    // Signals para estado reativo
    isLoading = signal(false);
    selectedCompany = signal<Company | null>(null);

    limitsForm: FormGroup;

    constructor() {
        this.limitsForm = this.fb.group({
            startTime: ['', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
            endTime: ['', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
            dailyValueLimit: [0, [Validators.required, Validators.min(0.01)]],
            monthlyValueLimit: [0, [Validators.required, Validators.min(0.01)]],
            dailyQuantityLimit: [0, [Validators.required, Validators.min(1)]],
            walletPercentageLimit: [0, [Validators.required, Validators.min(0.01), Validators.max(100)]]
        });
    }

    ngOnInit(): void {
        this.loadCompanyData();
        this.loadExistingLimits();
    }

    private initializeForm(): void {

    }

    private loadCompanyData(): void {
        this.pixLimitsService.getSelectedCompany().subscribe({
            next: (company) => {
                this.selectedCompany.set(company);
            },
            error: (error) => {
                console.error('Erro ao carregar dados da empresa:', error);
            }
        });
    }

    private loadExistingLimits(): void {
        this.isLoading.set(true);

        this.pixLimitsService.getCurrentPixLimits().subscribe({
            next: (limits) => {
                if (limits) {
                    this.limitsForm.patchValue({
                        startTime: limits.startTime,
                        endTime: limits.endTime,
                        dailyValueLimit: limits.dailyValueLimit,
                        monthlyValueLimit: limits.monthlyValueLimit,
                        dailyQuantityLimit: limits.dailyQuantityLimit,
                        walletPercentageLimit: limits.walletPercentageLimit
                    });
                }
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Erro ao carregar limites existentes:', error);
                this.isLoading.set(false);
            }
        });
    }

    onSave(): void {
        if (this.limitsForm.valid && this.selectedCompany()) {
            this.isLoading.set(true);

            const formValue = this.limitsForm.value;
            const limits: Omit<PixLimits, 'id' | 'createdAt' | 'updatedAt'> = {
                companyId: this.selectedCompany()!.id,
                startTime: formValue.startTime,
                endTime: formValue.endTime,
                dailyValueLimit: Number(formValue.dailyValueLimit),
                monthlyValueLimit: Number(formValue.monthlyValueLimit),
                dailyQuantityLimit: Number(formValue.dailyQuantityLimit),
                walletPercentageLimit: Number(formValue.walletPercentageLimit),
                isActive: true
            };

            this.pixLimitsService.savePixLimits(limits).subscribe({
                next: (savedLimits) => {
                    this.isLoading.set(false);
                    this.dialogRef.close(savedLimits);
                },
                error: (error) => {
                    console.error('Erro ao salvar limites:', error);
                    this.isLoading.set(false);
                }
            });
        } else {
            this.markFormGroupTouched();
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    private markFormGroupTouched(): void {
        Object.keys(this.limitsForm.controls).forEach(key => {
            const control = this.limitsForm.get(key);
            control?.markAsTouched();
        });
    }

    // Getters para facilitar acesso aos controles do formulário
    get startTime() { return this.limitsForm.get('startTime'); }
    get endTime() { return this.limitsForm.get('endTime'); }
    get dailyValueLimit() { return this.limitsForm.get('dailyValueLimit'); }
    get monthlyValueLimit() { return this.limitsForm.get('monthlyValueLimit'); }
    get dailyQuantityLimit() { return this.limitsForm.get('dailyQuantityLimit'); }
    get walletPercentageLimit() { return this.limitsForm.get('walletPercentageLimit'); }
}