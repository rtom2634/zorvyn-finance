import { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { StatCard } from './StatCard';
import { TransactionChart } from './TransactionChart';
import { TransactionTable } from './TransactionTable';
import { AddTransactionModal } from './AddTransactionModal';
import { InsightsSection } from './InsightsSection';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Plus, Loader2 } from 'lucide-react';

export const DashboardOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { transactions, role, isLoading } = useFinanceStore();

  // Dynamic calculations based on current transactions
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      
      {/* 1. Header Section - Responsive Flex */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Dashboard
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Welcome back, Kumar Aryan. Here's your financial summary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Subtle Loading Indicator (Point #6) */}
          {isLoading && (
            <div className="flex items-center gap-2 text-indigo-500 text-sm font-bold bg-indigo-50 dark:bg-indigo-900/20 px-3 py-2 rounded-lg">
              <Loader2 size={16} className="animate-spin" />
              Syncing...
            </div>
          )}

          {role === 'Admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">New Transaction</span>
              <span className="sm:hidden">Add</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Stat Cards - Responsive Grid (Point #4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Balance" 
          amount={balance} 
          icon={<Wallet size={24} className="text-indigo-600 dark:text-indigo-400" />} 
          colorClass="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800"
        />
        <StatCard 
          title="Total Income" 
          amount={totalIncome} 
          icon={<ArrowUpCircle size={24} className="text-emerald-600 dark:text-emerald-400" />} 
          colorClass="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800"
        />
        <StatCard 
          title="Total Expenses" 
          amount={totalExpense} 
          icon={<ArrowDownCircle size={24} className="text-rose-600 dark:text-rose-400" />} 
          colorClass="bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800"
        />
      </div>

      {/* 3. Insights Section (Point #5 & #2) */}
      <InsightsSection />

      {/* 4. Main Content - Chart & Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Chart (Taking up more space on large screens) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Activity Trend</h3>
            <TransactionChart />
          </div>
        </div>

        {/* Right Column: Mini Table or Quick Actions */}
        <div className="xl:col-span-1">
           <TransactionTable isMiniView={true} />
        </div>
      </div>

      {/* Add Modal */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};