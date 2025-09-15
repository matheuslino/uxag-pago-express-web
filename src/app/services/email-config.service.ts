import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { EmailConfig, Company } from '../interface/email-config.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailConfigService {
  private emailConfigSignal = signal<EmailConfig | null>(null);

  // Mock data para empresas
  private mockCompanies: Company[] = [
    { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' },
    { id: '2', name: 'Wansoft Brazil', code: 'WANSOFT', icon: '💻' },
    { id: '3', name: 'Tech Solutions', code: 'TECHSOL', icon: '⚡' }
  ];

  // Mock data para configuração inicial
  private mockEmailConfig: EmailConfig = {
    id: '1',
    companyName: '123 Milhas',
    companyCode: '123MILHAS',
    email: 'danilo@12dev.com.br'
  };

  constructor() {
    // Inicializa com dados mockados
    this.emailConfigSignal.set(this.mockEmailConfig);
  }

  // Getter para acessar o signal
  get emailConfig() {
    return this.emailConfigSignal.asReadonly();
  }

  // Simula busca de empresas
  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }

  // Simula busca da configuração atual
  getEmailConfig(): Observable<EmailConfig | null> {
    return of(this.emailConfigSignal()).pipe(delay(300));
  }

  // Simula salvamento da configuração
  saveEmailConfig(config: EmailConfig): Observable<EmailConfig> {
    return of(config).pipe(
      delay(500),
      // Simula resposta do backend
      map(savedConfig => {
        this.emailConfigSignal.set(savedConfig);
        return savedConfig;
      })
    );
  }
}