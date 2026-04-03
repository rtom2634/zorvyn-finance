import React, { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { X, DollarSign, Tag, FileText } from 'lucide-react';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal = ({ isOpen, onClose }: AddTransactionModalProps) => {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'Expense' as 'Income' | 'Expense',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: new Date().toISOString().split('T')[0], // Today's date
    });

    // Reset and close
    setFormData({ description: '', amount: '', category: 'Food', type: 'Expense' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">New Transaction</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Toggle Type */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'Income' })}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                formData.type === 'Income' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Credit (+)
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'Expense' })}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                formData.type === 'Expense' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Debit (-)
            </button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <FileText size={16} /> Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Monthly Salary or Coffee"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <DollarSign size={16} /> Amount
            </label>
            <input
              type="number"
              required
              step="0.01"
              placeholder="0.00"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Tag size={16} /> Category
            </label>
            <select
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option>Salary</option>
              <option>Freelance</option>
              <option>Housing</option>
              <option>Food</option>
              <option>Utilities</option>
              <option>Transportation</option>
              <option>Entertainment</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.98] mt-2"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};