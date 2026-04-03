import { Transaction } from '../store/useFinanceStore';

// Initial data to show if LocalStorage is empty
const initialData: Transaction[] = [
  { id: '1', description: 'TechCorp Salary', amount: 4500, date: '2026-04-01', category: 'Salary', type: 'Income' },
  { id: '2', description: 'Downtown Apartment Rent', amount: 1200, date: '2026-04-01', category: 'Housing', type: 'Expense' },
  { id: '3', description: 'Whole Foods Groceries', amount: 145.50, date: '2026-04-02', category: 'Food', type: 'Expense' },
  { id: '4', description: 'Uber Rides', amount: 45.00, date: '2026-04-02', category: 'Transport', type: 'Expense' },
  { id: '5', description: 'Netflix Subscription', amount: 15.99, date: '2026-04-03', category: 'Entertainment', type: 'Expense' },
  { id: '6', description: 'Freelance Web Design', amount: 850, date: '2026-04-03', category: 'Salary', type: 'Income' },
  { id: '7', description: 'Amazon Electronics', amount: 299.99, date: '2026-04-04', category: 'Shopping', type: 'Expense' },
  { id: '8', description: 'Coffee Shop', amount: 8.50, date: '2026-04-04', category: 'Food', type: 'Expense' },
  { id: '9', description: 'Monthly Metro Pass', amount: 80, date: '2026-04-05', category: 'Transport', type: 'Expense' },
  { id: '10', description: 'Concert Tickets', amount: 120, date: '2026-04-05', category: 'Entertainment', type: 'Expense' },
];

const STORAGE_KEY = 'zorvyn_finance_data_v2';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockApi = {
  fetchTransactions: async (): Promise<Transaction[]> => {
    await delay(600); 
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  },

  addTransaction: async (tx: Omit<Transaction, 'id'>): Promise<Transaction> => {
    await delay(500);
    const newTx = { ...tx, id: Math.random().toString(36).substr(2, 9) };
    const stored = localStorage.getItem(STORAGE_KEY);
    const current = stored ? JSON.parse(stored) : [];
    
    const updated = [newTx, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newTx;
  },

  deleteTransaction: async (id: string): Promise<void> => {
    await delay(400);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const current: Transaction[] = JSON.parse(stored);
      const filtered = current.filter(t => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
  }
};