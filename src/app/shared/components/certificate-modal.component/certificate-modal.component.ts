import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CertificateModalService } from '../../../services/certificate-modal.service';
import { Certificate } from '../../../interface/certificate-modal.interface';

@Component({
  selector: 'app-certificate-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './certificate-modal.component.html',
  styleUrl: './certificate-modal.component.scss',
})
export class CertificateModalComponent implements OnInit {
  private certificateService = inject(CertificateModalService);
  private dialogRef = inject(MatDialogRef<CertificateModalComponent>);

  // Signals para estado reativo
  certificates = signal<Certificate[]>([]);
  isLoading = signal(false);
  isUploading = signal(false);

  ngOnInit() {
    this.loadCertificates();
  }

  private loadCertificates() {
    this.isLoading.set(true);
    this.certificateService.getCertificates().subscribe({
      next: (certificates) => {
        this.certificates.set(certificates);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadCertificate(file);
    }
  }

  private uploadCertificate(file: File) {
    this.isUploading.set(true);
    this.certificateService.uploadCertificate(file).subscribe({
      next: (newCertificate) => {
        const currentCerts = this.certificates();
        this.certificates.set([...currentCerts, newCertificate]);
        this.isUploading.set(false);
      },
      error: () => {
        this.isUploading.set(false);
      }
    });
  }

  deleteCertificate(certificateId: string) {
    this.certificateService.deleteCertificate(certificateId).subscribe({
      next: () => {
        const currentCerts = this.certificates();
        const updatedCerts = currentCerts.filter(cert => cert.id !== certificateId);
        this.certificates.set(updatedCerts);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Ativo':
        return 'status-active';
      case 'Pendente':
        return 'status-pending';
      case 'Expirado':
        return 'status-expired';
      default:
        return '';
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close(this.certificates());
  }
}