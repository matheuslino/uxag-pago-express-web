import { Transaction } from "./transaction.model";

export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalTransactions: number;
  recentTransactions: Transaction[];
  monthlyChart: MonthlyChartData[];
}

export interface MonthlyChartData {
  month: string;
  income: number;
  expenses: number;
}