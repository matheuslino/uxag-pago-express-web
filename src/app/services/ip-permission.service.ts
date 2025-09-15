// ip-config.service.ts
import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Company, IpPermission } from '../interface/ip-permission.interface';

@Injectable({
    providedIn: 'root'
})
export class IpConfigService {
    private ipPermissionsSignal = signal<IpPermission[]>([]);

    // Mock data para empresas
    private mockCompanies: Company[] = [
        { id: '1', name: '123 Milhas', code: '123MILHAS', icon: '🏢' },
        { id: '2', name: 'Wansoft Brazil', code: 'WANSOFT', icon: '💻' },
        { id: '3', name: 'Tech Solutions', code: 'TECHSOL', icon: '⚡' }
    ];

    // Mock data para IPs permitidos
    private mockIpPermissions: IpPermission[] = [
        {
            id: '1',
            ip: '10.0.0.1',
            createdBy: 'lucas_adm',
            createdAt: new Date('2025-03-15T11:48:00'),
            companyId: '1'
        }
    ];

    constructor() {
        // Inicializa com dados mockados
        this.ipPermissionsSignal.set(this.mockIpPermissions);
    }

    // Getter para acessar o signal
    get ipPermissions() {
        return this.ipPermissionsSignal.asReadonly();
    }

    // Simula busca de empresas
    getCompanies(): Observable<Company[]> {
        return of(this.mockCompanies).pipe(delay(300));
    }

    // Simula busca dos IPs permitidos
    getIpPermissions(companyId: string): Observable<IpPermission[]> {
        const filteredIps = this.ipPermissionsSignal().filter(ip => ip.companyId === companyId);
        return of(filteredIps).pipe(delay(300));
    }

    // Simula adição de novo IP
    addIpPermission(ip: string, companyId: string, createdBy: string): Observable<IpPermission> {
        const newIp: IpPermission = {
            id: Date.now().toString(),
            ip,
            createdBy,
            createdAt: new Date(),
            companyId
        };

        return of(newIp).pipe(
            delay(500),
            map(savedIp => {
                const currentIps = this.ipPermissionsSignal();
                this.ipPermissionsSignal.set([...currentIps, savedIp]);
                return savedIp;
            })
        );
    }

    // Simula remoção de IP
    removeIpPermission(ipId: string): Observable<boolean> {
        return of(true).pipe(
            delay(300),
            map(() => {
                const currentIps = this.ipPermissionsSignal();
                const filteredIps = currentIps.filter(ip => ip.id !== ipId);
                this.ipPermissionsSignal.set(filteredIps);
                return true;
            })
        );
    }

    // Valida formato de IP
    validateIpFormat(ip: string): boolean {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ip);
    }

    // Verifica se IP já existe
    ipExists(ip: string, companyId: string): boolean {
        return this.ipPermissionsSignal().some(permission => 
            permission.ip === ip && permission.companyId === companyId
        );
    }
}