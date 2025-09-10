export const MOCK_USER = {
  id: '1',
  name: 'Antônio Coutinho',
  email: 'antonio@example.com',
  phone: '+55 11 99999-9999',
  cpf: '123.456.789-00',
  avatar: '',
  role: 'user' as const,
  isActive: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
  preferences: {
    notifications: {
      email: true,
      sms: true,
      push: true
    },
    theme: 'light' as const,
    language: 'pt-BR'
  }
};

export const MOCK_WALLETS = [
  {
    id: '1',
    name: 'Carteira Principal',
    type: 'checking' as const,
    balance: 12200.50,
    currency: 'BRL',
    userId: '1',
    accountNumber: '123456-7',
    agency: '0001',
    isActive: true,
    pixKeys: [
      {
        id: '1',
        key: 'antonio@example.com',
        type: 'email' as const,
        walletId: '1',
        isActive: true,
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        key: '+5511999999999',
        type: 'phone' as const,
        walletId: '1',
        isActive: true,
        createdAt: new Date('2024-01-20')
      }
    ],
    limits: {
      dailyLimit: 5000,
      monthlyLimit: 20000,
      pixLimit: 1000,
      transferLimit: 10000
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Poupança',
    type: 'savings' as const,
    balance: 15000.00,
    currency: 'BRL',
    userId: '1',
    accountNumber: '654321-0',
    agency: '0001',
    isActive: true,
    pixKeys: [],
    limits: {
      dailyLimit: 2000,
      monthlyLimit: 10000,
      pixLimit: 500,
      transferLimit: 5000
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  }
];

export const MOCK_TRANSACTIONS = [
  {
    id: '1',
    type: 'pix_receive' as const,
    amount: 250.00,
    currency: 'BRL',
    description: 'Transferência recebida',
    status: 'completed' as const,
    fromAccountInfo: {
      name: 'João Silva',
      cpf: '987.654.321-00',
      bank: 'Banco do Brasil',
      agency: '1234',
      account: '567890',
      accountType: 'checking' as const
    },
    toWalletId: '1',
    fees: 0,
    createdAt: new Date('2024-01-20T10:30:00'),
    completedAt: new Date('2024-01-20T10:30:05'),
    pixInfo: {
      key: 'antonio@example.com',
      keyType: 'email' as const,
      endToEndId: 'E12345678901234567890123456789012345'
    }
  },
  {
    id: '2',
    type: 'transfer' as const,
    amount: 1500.00,
    currency: 'BRL',
    description: 'Transferência entre contas',
    status: 'completed' as const,
    fromWalletId: '1',
    toWalletId: '2',
    fees: 0,
    createdAt: new Date('2024-01-19T14:15:00'),
    completedAt: new Date('2024-01-19T14:15:10')
  },
  {
    id: '3',
    type: 'pix_send' as const,
    amount: 100.00,
    currency: 'BRL',
    description: 'Pagamento PIX',
    status: 'completed' as const,
    fromWalletId: '1',
    toAccountInfo: {
      name: 'Maria Santos',
      cpf: '456.789.123-00',
      bank: 'Itaú',
      agency: '5678',
      account: '123456',
      accountType: 'savings' as const
    },
    fees: 0,
    createdAt: new Date('2024-01-18T16:45:00'),
    completedAt: new Date('2024-01-18T16:45:03'),
    pixInfo: {
      key: '+5511987654321',
      keyType: 'phone' as const,
      endToEndId: 'E98765432109876543210987654321098765'
    }
  },
  {
    id: '4',
    type: 'deposit' as const,
    amount: 2000.00,
    currency: 'BRL',
    description: 'Depósito em conta',
    status: 'completed' as const,
    toWalletId: '1',
    fees: 0,
    createdAt: new Date('2024-01-17T09:20:00'),
    completedAt: new Date('2024-01-17T09:20:15')
  },
  {
    id: '5',
    type: 'withdrawal' as const,
    amount: 500.00,
    currency: 'BRL',
    description: 'Saque ATM',
    status: 'completed' as const,
    fromWalletId: '1',
    fees: 4.50,
    createdAt: new Date('2024-01-16T18:30:00'),
    completedAt: new Date('2024-01-16T18:30:20')
  }
];

export const MOCK_CLIENTS = [
  {
    id: '1',
    name: 'Ui Milles',
    email: 'ui.milles@example.com',
    phone: '+55 11 98765-4321',
    cpf: '123.456.789-01',
    birthDate: new Date('1990-05-15'),
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    documents: [],
    wallets: [],
    status: 'active' as const,
    riskLevel: 'low' as const,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    lastLogin: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'projeto.bauer',
    email: 'projeto.bauer@example.com',
    phone: '+55 11 91234-5678',
    cpf: '987.654.321-01',
    birthDate: new Date('1985-08-22'),
    address: {
      street: 'Av. Paulista',
      number: '456',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      country: 'Brasil'
    },
    documents: [],
    wallets: [],
    status: 'active' as const,
    riskLevel: 'medium' as const,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date(),
    lastLogin: new Date('2024-01-19')
  },
  {
    id: '3',
    name: 'Lara Senne',
    email: 'lara.senne@example.com',
    phone: '+55 11 95678-1234',
    cpf: '456.789.123-01',
    birthDate: new Date('1992-12-10'),
    address: {
      street: 'Rua Augusta',
      number: '789',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-000',
      country: 'Brasil'
    },
    documents: [],
    wallets: [],
    status: 'active' as const,
    riskLevel: 'low' as const,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date(),
    lastLogin: new Date('2024-01-18')
  }
];

export const MOCK_BANKS = [
  {
    code: '001',
    name: 'Banco do Brasil S.A.',
    shortName: 'Banco do Brasil',
    logo: ''
  },
  {
    code: '341',
    name: 'Itaú Unibanco S.A.',
    shortName: 'Itaú',
    logo: ''
  },
  {
    code: '033',
    name: 'Banco Santander Brasil S.A.',
    shortName: 'Santander',
    logo: ''
  },
  {
    code: '104',
    name: 'Caixa Econômica Federal',
    shortName: 'Caixa',
    logo: ''
  },
  {
    code: '237',
    name: 'Banco Bradesco S.A.',
    shortName: 'Bradesco',
    logo: ''
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'PIX Recebido',
    message: 'Você recebeu R$ 250,00 via PIX de João Silva',
    type: 'pix' as const,
    userId: '1',
    isRead: false,
    actionUrl: '/transactions/1',
    metadata: { transactionId: '1' },
    createdAt: new Date('2024-01-20T10:30:00')
  },
  {
    id: '2',
    title: 'Transferência Realizada',
    message: 'Transferência de R$ 1.500,00 realizada com sucesso',
    type: 'transaction' as const,
    userId: '1',
    isRead: true,
    actionUrl: '/transactions/2',
    metadata: { transactionId: '2' },
    createdAt: new Date('2024-01-19T14:15:00'),
    readAt: new Date('2024-01-19T15:00:00')
  },
  {
    id: '3',
    title: 'Nova chave PIX cadastrada',
    message: 'Sua chave PIX por telefone foi cadastrada com sucesso',
    type: 'pix' as const,
    userId: '1',
    isRead: true,
    actionUrl: '/pix/keys',
    createdAt: new Date('2024-01-20T08:00:00'),
    readAt: new Date('2024-01-20T08:30:00')
  }
];

export const MOCK_DASHBOARD_STATS = {
  totalBalance: 27200.50,
  monthlyIncome: 5420.00,
  monthlyExpenses: 3280.00,
  totalTransactions: 45,
  recentTransactions: MOCK_TRANSACTIONS.slice(0, 3),
  monthlyChart: [
    { month: 'Jan', income: 5420, expenses: 3280 },
    { month: 'Dec', income: 4890, expenses: 2950 },
    { month: 'Nov', income: 5120, expenses: 3180 },
    { month: 'Oct', income: 4760, expenses: 2850 }
  ]
};