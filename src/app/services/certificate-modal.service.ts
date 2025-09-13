import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Certificate } from '../interface/certificate-modal.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificateModalService {
  private certificatesSignal = signal<Certificate[]>([]);

  // Mock data para certificados
  private mockCertificates: Certificate[] = [
    {
      id: '1',
      createdAt: '15/03/2025\n11h48',
      validUntil: '08/03/2025',
      status: 'Ativo',
      fileName: 'certificado_empresa.p12'
    },
    {
      id: '2',
      createdAt: '15/03/2025\n11h48',
      validUntil: '08/03/2025',
      status: 'Pendente',
      fileName: 'certificado_backup.p12'
    }
  ];

  constructor() {
    this.certificatesSignal.set(this.mockCertificates);
  }

  get certificates() {
    return this.certificatesSignal.asReadonly();
  }

  getCertificates(): Observable<Certificate[]> {
    return of(this.certificatesSignal()).pipe(delay(300));
  }

  deleteCertificate(id: string): Observable<boolean> {
    return of(true).pipe(
      delay(500),
      // Simula remoção do certificado
      tap(() => {
        const currentCerts = this.certificatesSignal();
        const updatedCerts = currentCerts.filter(cert => cert.id !== id);
        this.certificatesSignal.set(updatedCerts);
      })
    );
  }

  uploadCertificate(file: File): Observable<Certificate> {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('pt-BR') + '\n' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: 'Pendente',
      fileName: file.name
    };

    return of(newCertificate).pipe(
      delay(1000),
      tap(cert => {
        const currentCerts = this.certificatesSignal();
        this.certificatesSignal.set([...currentCerts, cert]);
      })
    );
  }
}