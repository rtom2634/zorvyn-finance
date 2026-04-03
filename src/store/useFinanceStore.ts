import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mockApi } from '../api/mockApi';

export type Role = 'Admin' | 'Viewer';
export type Tab = 'Dashboard' | 'Transactions' | 'Settings';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'Income' | 'Expense';
}

interface FinanceStore {
  // State
  role: Role;
  transactions: Transaction[];
  searchQuery: string;
  categoryFilter: string | null;
  theme: 'light' | 'dark';
  currency: 'USD' | 'EUR' | 'GBP' | 'INR';
  activeTab: Tab;
  isLoading: boolean;

  // Actions
  setRole: (role: Role) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrency: (currency: 'USD' | 'EUR' | 'GBP' | 'INR') => void;
  setActiveTab: (tab: Tab) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string | null) => void;
  
  // Async Actions
  loadTransactions: () => Promise<void>;
  addTransaction: (tx: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      role: 'Admin',
      transactions: [],
      searchQuery: '',
      categoryFilter: null,
      theme: 'dark',
      currency: 'USD',
      activeTab: 'Dashboard',
      isLoading: false,

      setRole: (role) => set({ role }),
      setCurrency: (currency) => set({ currency }),
      setActiveTab: (tab) => set({ activeTab: tab }), // THIS is the function your sidebar needs
      setSearchQuery: (query) => set({ searchQuery: query }),
      setCategoryFilter: (category) => set({ categoryFilter: category }),

      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      loadTransactions: async () => {
        set({ isLoading: true });
        const data = await mockApi.fetchTransactions();
        set({ transactions: data, isLoading: false });
      },

      addTransaction: async (newTx) => {
        set({ isLoading: true });
        const added = await mockApi.addTransaction(newTx);
        set((state) => ({ transactions: [added, ...state.transactions], isLoading: false }));
      },

      deleteTransaction: async (id) => {
        set({ isLoading: true });
        await mockApi.deleteTransaction(id);
        set((state) => ({ transactions: state.transactions.filter(t => t.id !== id), isLoading: false }));
      },
    }),
    {
      // Changed the key to v2 to force clear the corrupted local storage!
      name: 'finance-storage-v2',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        theme: state.theme, 
        currency: state.currency, 
        role: state.role, 
        activeTab: state.activeTab 
      }),
    }
  )
);