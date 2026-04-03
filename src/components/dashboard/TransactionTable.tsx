import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency, getCategoryColor } from '../../utils/formatters';
import { Trash2, ReceiptText, Search, ArrowUpDown } from 'lucide-react';
import { useState, useMemo } from 'react';

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'a-z' | 'z-a';

export const TransactionTable = ({ isMiniView = false }: { isMiniView?: boolean }) => {
  const { transactions, currency, deleteTransaction, role, searchQuery, setSearchQuery } = useFinanceStore();
  const [typeFilter, setTypeFilter] = useState<'All' | 'Income' | 'Expense'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // 1. Filter AND Sort Logic combined cleanly
  const processedTransactions = useMemo(() => {
    // Step A: Filter
    let filtered = transactions.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'All' || t.type === typeFilter;
      return matchesSearch && matchesType;
    });

    // Step B: Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'highest': return b.amount - a.amount;
        case 'lowest': return a.amount - b.amount;
        case 'a-z': return a.description.localeCompare(b.description);
        case 'z-a': return b.description.localeCompare(a.description);
        case 'oldest': return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'newest': 
        default: return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [transactions, searchQuery, typeFilter, sortBy]);

  const displayTransactions = isMiniView ? processedTransactions.slice(0, 5) : processedTransactions;

  return (
    <div className="space-y-4">
      {/* Advanced Filter Bar */}
      {!isMiniView && (
        <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search descriptions or categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Type Filter */}
            <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl">
              {(['All', 'Income', 'Expense'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                    typeFilter === type ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900/50 rounded-xl px-3 border border-slate-200 dark:border-slate-700">
              <ArrowUpDown size={16} className="text-slate-400 mr-2" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-300 outline-none cursor-pointer py-2 appearance-none pr-4"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            {/* ... Existing thead and tbody map logic using displayTransactions ... */}
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Amount</th>
                {!isMiniView && <th className="px-6 py-4">Category</th>}
                {!isMiniView && <th className="px-6 py-4">Date</th>}
                {role === 'Admin' && <th className="px-6 py-4"></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {displayTransactions.length === 0 && (
                 <tr><td colSpan={5} className="p-6 text-center text-slate-500">No transactions match your filters.</td></tr>
              )}
              {displayTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group">
                  {/* Same table row UI as before */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${t.type === 'Income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        <ReceiptText size={16} />
                      </div>
                      <span className="font-medium text-slate-700 dark:text-slate-200">{t.description}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 font-bold ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount, currency)}
                  </td>
                  {!isMiniView && (
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(t.category)}`}>
                        {t.category}
                      </span>
                    </td>
                  )}
                  {!isMiniView && (
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{t.date}</td>
                  )}
                  {role === 'Admin' && (
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => deleteTransaction(t.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};