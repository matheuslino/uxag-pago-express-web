export interface Certificate {
id: string;
createdAt: string;
validUntil: string;
status: 'Ativo' | 'Pendente' | 'Expirado';
fileName?: string;
}


export interface CertificateConfig {
certificates: Certificate[];
}