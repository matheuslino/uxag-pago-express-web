import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { BankConfig, Company } from '../interface/bank-config.interface';

@Injectable({
    providedIn: 'root'
})
export class BankConfigService {
    // Signal para gerenciar estado reativo
    private bankConfigSignal = signal<BankConfig | null>(null);

    // Mock data para empresas
    private mockCompanies: Company[] = [
        { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' },
        { id: '2', name: 'Wansoft Brazil', code: 'WANSOFT', icon: '💻' },
        { id: '3', name: 'Tech Solutions', code: 'TECHSOL', icon: '⚡' }
    ];

    // Mock data para configuração inicial
    private mockBankConfig: BankConfig = {
        id: '1',
        companyName: '123 Milhas',
        companyCode: '123MILHAS',
        pixIn: 'STARK BANK',
        pixOut: 'STARK BANK',
        sendPix: 'Bradescot',
        creditCard: 'Entrepay',
        boleto: 'ASAAS',
        billPayment: 'Sem definição'
    };

    constructor() {
        // Inicializa com dados mockados
        this.bankConfigSignal.set(this.mockBankConfig);
    }

    // Getter para acessar o signal
    get bankConfig() {
        return this.bankConfigSignal.asReadonly();
    } 

    // Simula busca de empresas
    getCompanies(): Observable<Company[]> {
        return of(this.mockCompanies).pipe(delay(300));
    }

    // Simula busca da configuração atual
    getBankConfig(): Observable<BankConfig | null> {
        return of(this.bankConfigSignal()).pipe(delay(300));
    }

    // Simula salvamento da configuração
    saveBankConfig(config: BankConfig): Observable<BankConfig> {
        return of(config).pipe(
            delay(500),
            // Simula resposta do backend
            map(savedConfig => {
                this.bankConfigSignal.set(savedConfig);
                return savedConfig;
            })
        );
    }
}