// ip-config-modal.component.ts
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
import { IpConfigService } from '../../../services/ip-permission.service';
import { Company, IpPermission } from '../../../interface/ip-permission.interface';

@Component({
  selector: 'app-ip-config-modal',
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
  templateUrl: './ip-permission-modal.component.html',
  styleUrl: './ip-permission-modal.component.scss',
})
export class IpConfigModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ipConfigService = inject(IpConfigService);
  private dialogRef = inject(MatDialogRef<IpConfigModalComponent>);

  // Signals para estado reativo
  selectedCompany = signal<Company | null>(null);
  ipPermissions = signal<IpPermission[]>([]);
  isLoading = signal(false);
  isAddingIp = signal(false);

  ipForm: FormGroup;
  displayedColumns: string[] = ['ip', 'createdBy', 'createdAt', 'actions'];

  constructor() {
    this.ipForm = this.fb.group({
      ipAddress: ['', [
        Validators.required,
        this.ipValidator.bind(this)
      ]]
    });
  }

  ngOnInit() {
    this.loadCompanyInfo();
  }

  private loadCompanyInfo() {
    this.ipConfigService.getCompanies().subscribe(companies => {
      if (companies.length > 0) {
        this.selectedCompany.set(companies[0]);
        this.loadIpPermissions(companies[0].id);
      }
    });
  }

  private loadIpPermissions(companyId: string) {
    this.isLoading.set(true);
    this.ipConfigService.getIpPermissions(companyId).subscribe({
      next: (permissions) => {
        this.ipPermissions.set(permissions);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar IPs:', error);
        this.isLoading.set(false);
      }
    });
  }

  // Validador customizado para IP
  private ipValidator(control: any) {
    const ip = control.value;
    if (!ip) return null;

    if (!this.ipConfigService.validateIpFormat(ip)) {
      return { invalidIp: true };
    }

    const company = this.selectedCompany();
    if (company && this.ipConfigService.ipExists(ip, company.id)) {
      return { ipExists: true };
    }

    return null;
  }

  onAddIp() {
    if (this.ipForm.valid) {
      const company = this.selectedCompany();
      if (!company) return;

      this.isAddingIp.set(true);
      const ipAddress = this.ipForm.get('ipAddress')?.value;

      this.ipConfigService.addIpPermission(ipAddress, company.id, 'current_user').subscribe({
        next: (newIp) => {
          const currentIps = this.ipPermissions();
          this.ipPermissions.set([...currentIps, newIp]);
          this.ipForm.reset();
          this.isAddingIp.set(false);
        },
        error: (error) => {
          console.error('Erro ao adicionar IP:', error);
          this.isAddingIp.set(false);
        }
      });
    }
  }

  onRemoveIp(ipId: string) {
    this.ipConfigService.removeIpPermission(ipId).subscribe({
      next: () => {
        const currentIps = this.ipPermissions();
        this.ipPermissions.set(currentIps.filter(ip => ip.id !== ipId));
      },
      error: (error) => {
        console.error('Erro ao remover IP:', error);
      }
    });
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

  getIpError(): string {
    const control = this.ipForm.get('ipAddress');
    if (control?.hasError('required')) {
      return 'IP é obrigatório';
    }
    if (control?.hasError('invalidIp')) {
      return 'Formato de IP inválido';
    }
    if (control?.hasError('ipExists')) {
      return 'Este IP já está cadastrado';
    }
    return '';
  }

  onClose() {
    this.dialogRef.close();
  }
}