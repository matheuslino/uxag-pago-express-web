// ip-config.interface.ts
export interface IpPermission {
  id: string;
  ip: string;
  createdBy: string;
  createdAt: Date;
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  code: string;
  icon: string;
}