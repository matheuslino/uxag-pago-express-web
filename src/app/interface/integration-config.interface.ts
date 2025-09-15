// interfaces/integration-config.interface.ts
export interface IntegrationConfig {
  id: string;
  name: string;
  description: string;
  login: string;
  password: string;
  isActive: boolean;
}

export interface Company {
  id: string;
  name: string;
  document: string;
}