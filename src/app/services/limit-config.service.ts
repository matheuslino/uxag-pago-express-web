import { Injectable, signal } from '@angular/core';
import { of, delay, map, Observable } from 'rxjs';
import { LimitConfig, Company } from '../interface/limit-config.interface';

@Injectable({
  providedIn: 'root'
})
export class LimitConfigService {
  private limitsSignal = signal<LimitConfig[]>([]);

  private mockCompanies: Company[] = [
    { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' }
  ];

  private mockLimits: LimitConfig[] = [
    {
      id: '1',
      companyId: '1',
      dailyLimit: 100,
      monthlyLimit: 1000,
      createdBy: 'lucas_adm',
      createdAt: new Date('2025-03-15T11:48:00')
    }
  ];

  constructor() {
    this.limitsSignal.set(this.mockLimits);
  }

  get limits() {
    return this.limitsSignal.asReadonly();
  }

  getCompanies(): Observable<Company[]> {
    return of(this.mockCompanies).pipe(delay(300));
  }

  getLimits(companyId: string): Observable<LimitConfig[]> {
    const filtered = this.limitsSignal().filter(l => l.companyId === companyId);
    return of(filtered).pipe(delay(300));
  }

  addLimit(daily: number, monthly: number, companyId: string, createdBy: string): Observable<LimitConfig> {
    const newLimit: LimitConfig = {
      id: Date.now().toString(),
      dailyLimit: daily,
      monthlyLimit: monthly,
      companyId,
      createdBy,
      createdAt: new Date()
    };
    return of(newLimit).pipe(
      delay(500),
      map(saved => {
        this.limitsSignal.set([...this.limitsSignal(), saved]);
        return saved;
      })
    );
  }
}
