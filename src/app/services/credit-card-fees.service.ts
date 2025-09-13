import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreditCardFeeConfig } from '../shared/components/credit-card-fees-modal.component/credit-card-fees-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CreditCardFeesService {
  private feesSubject = new BehaviorSubject<CreditCardFeeConfig[]>([]);
  public fees$ = this.feesSubject.asObservable();

  // Dados mockados iniciais
  private mockFees: CreditCardFeeConfig[] = [
    {
      id: 'fee_1',
      fornecedor: 'entrepay',
      bandeira: 'visa',
      tipo: 'avista',
      minParcela: 0,
      maxParcela: 2,
      taxa: 0.01
    },
    {
      id: 'fee_2',
      fornecedor: 'entrepay',
      bandeira: 'visa',
      tipo: 'avista',
      minParcela: 0,
      maxParcela: 2,
      taxa: 0.01
    }
  ];

  constructor() {
    this.feesSubject.next(this.mockFees);
  }

  getFees(): Observable<CreditCardFeeConfig[]> {
    return this.fees$;
  }

  saveFees(fees: CreditCardFeeConfig[]): Observable<CreditCardFeeConfig[]> {
    // Simula salvamento no backend
    return new Promise(resolve => {
      setTimeout(() => {
        this.feesSubject.next(fees);
        resolve(fees);
      }, 1000);
    }) as any;
  }

  addFee(fee: CreditCardFeeConfig): void {
    const currentFees = this.feesSubject.value;
    const newFee = { ...fee, id: `fee_${Date.now()}` };
    this.feesSubject.next([...currentFees, newFee]);
  }

  updateFee(id: string, updatedFee: Partial<CreditCardFeeConfig>): void {
    const currentFees = this.feesSubject.value;
    const index = currentFees.findIndex(fee => fee.id === id);
    if (index !== -1) {
      currentFees[index] = { ...currentFees[index], ...updatedFee };
      this.feesSubject.next([...currentFees]);
    }
  }

  deleteFee(id: string): void {
    const currentFees = this.feesSubject.value;
    const filteredFees = currentFees.filter(fee => fee.id !== id);
    this.feesSubject.next(filteredFees);
  }
}