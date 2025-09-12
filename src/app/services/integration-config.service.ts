// services/integration-config.service.ts
import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { IntegrationConfig, Company } from '../interface/integration-config.interface';

@Injectable({
  providedIn: 'root'
})
export class IntegrationConfigService {
  private companies = signal<Company[]>([
    {
      id: '1',
      name: 'Empresa',
      document: '123 Milhas'
    },
    {
      id: '2',
      name: 'Wansoft Brazil',
      document: '12.345.678/0001-90'
    }
  ]);

  private integrationConfigs = signal<IntegrationConfig[]>([
    {
      id: 'entrepay',
      name: 'Entrepay',
      description: 'Integração com sistema Entrepay para processamento de pagamentos',
      login: '0120062839',
      password: 'qwertyasf128130',
      isActive: true
    },
    {
      id: 'pix',
      name: 'PIX Integration',
      description: 'Integração com sistema PIX do Banco Central',
      login: 'pixuser123',
      password: 'pixpass456',
      isActive: false
    }
  ]);

  getSelectedCompany(): Observable<Company> {
    // Simula seleção da primeira empresa
    return of(this.companies()[0]).pipe(delay(300));
  }

  getAllCompanies(): Observable<Company[]> {
    return of(this.companies()).pipe(delay(300));
  }

  getIntegrationConfig(integrationId: string): Observable<IntegrationConfig | null> {
    const config = this.integrationConfigs().find(c => c.id === integrationId);
    return of(config || null).pipe(delay(300));
  }

  saveIntegrationConfig(config: IntegrationConfig): Observable<IntegrationConfig> {
    // Simula salvamento no backend
    const configs = this.integrationConfigs();
    const existingIndex = configs.findIndex(c => c.id === config.id);
    
    if (existingIndex >= 0) {
      configs[existingIndex] = config;
    } else {
      configs.push(config);
    }
    
    this.integrationConfigs.set([...configs]);
    
    return of(config).pipe(delay(1000)); // Simula delay de rede
  }

  getAllIntegrationConfigs(): Observable<IntegrationConfig[]> {
    return of(this.integrationConfigs()).pipe(delay(300));
  }
}