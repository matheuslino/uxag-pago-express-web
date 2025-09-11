export interface TransferConfig {
  id: string;
  empresa: {
    nome: string;
    milhas: string;
  };
  gratis: number | null;
  limite: number | null;
  fixo: number | null;
  taxa: number | null;
  minimo: number | null;
  maximo: number | null;
}

export interface Company {
  id: string;
  nome: string;
  milhas: string;
  icon: string;
}