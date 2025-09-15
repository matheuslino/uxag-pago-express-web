import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { Company, PixLimits } from '../interface/pix-limits.interface';

@Injectable({
  providedIn: 'root'
})
export class PixLimitsService {
  private companies: Company[] = [
    {
      id: '1',
      name: 'Empresa',
      document: '123 Milhas',
      icon: 'business'
    },
    {
      id: '2', 
      name: 'Wansoft Brazil',
      document: '12.345.678/0001-90',
      icon: 'business'
    }
  ];

  private pixLimits: PixLimits[] = [
    {
      id: '1',
      companyId: '1',
      startTime: '08:00',
      endTime: '18:00',
      dailyValueLimit: 5000.00,
      monthlyValueLimit: 50000.00,
      dailyQuantityLimit: 10,
      walletPercentageLimit: 80.00,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    }
  ];

  // Signal para empresa selecionada
  private selectedCompanySignal = signal<Company>(this.companies[0]);

  getSelectedCompany(): Observable<Company> {
    return of(this.selectedCompanySignal()).pipe(delay(300));
  }

  getCurrentPixLimits(): Observable<PixLimits | null> {
    const currentCompany = this.selectedCompanySignal();
    const limits = this.pixLimits.find(l => l.companyId === currentCompany.id && l.isActive);
    return of(limits || null).pipe(delay(500));
  }

  savePixLimits(limits: Omit<PixLimits, 'id' | 'createdAt' | 'updatedAt'>): Observable<PixLimits> {
    // Simula validação de horários
    if (limits.startTime >= limits.endTime) {
      return throwError(() => new Error('Horário de início deve ser menor que horário final'));
    }

    // Simula validação de valores
    if (limits.dailyValueLimit > limits.monthlyValueLimit) {
      return throwError(() => new Error('Limite diário não pode ser maior que limite mensal'));
    }

    const newLimits: PixLimits = {
      ...limits,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Remove limites antigos da mesma empresa
    this.pixLimits = this.pixLimits.filter(l => l.companyId !== limits.companyId);
    
    // Adiciona novos limites
    this.pixLimits.push(newLimits);

    return of(newLimits).pipe(delay(1500)); // Simula delay de API
  }

  getAllCompanies(): Observable<Company[]> {
    return of(this.companies).pipe(delay(300));
  }

  setSelectedCompany(company: Company): void {
    this.selectedCompanySignal.set(company);
  }
}