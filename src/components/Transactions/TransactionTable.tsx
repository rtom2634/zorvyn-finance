import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency, getCategoryColor } from '../../utils/formatters';
import { Trash2, ReceiptText, Filter, Search } from 'lucide-react';
import { useState } from 'react';

export const TransactionTable = ({ isMiniView = false }: { isMiniView?: boolean }) => {
  const { 
    transactions, 
    currency, 
    deleteTransaction, 
    role, 
    searchQuery, 
    setSearchQuery 
  } = useFinanceStore();

  const [typeFilter, setTypeFilter] = useState<'All' | 'Income' | 'Expense'>('All');

  // 1. Advanced Filtering Logic (Point #3)
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const displayTransactions = isMiniView ? filteredTransactions.slice(0, 5) : filteredTransactions;

  return (
    <div className="space-y-4">
      {/* Filter Bar (Only show in full view) */}
      {!isMiniView && (
        <div className="flex flex-wrap gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by description or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl">
            {(['All', 'Income', 'Expense'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  typeFilter === type 
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' 
                    : 'text-slate-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* The Table Content (Keep your existing table JSX here, using displayTransactions) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
         {/* ... Existing Table Mapping ... */}
      </div>
    </div>
  );
};