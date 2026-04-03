export type Role = 'Admin' | 'Viewer';
export type TransactionType = 'Income' | 'Expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface FinanceState {
  role: Role;
  transactions: Transaction[];
  searchQuery: string;
  categoryFilter: string | null;
  
  setRole: (role: Role) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string | null) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
}