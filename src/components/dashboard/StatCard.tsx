import React from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/formatters';

interface StatCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  colorClass: string;
}

export const StatCard = ({ title, amount, icon, colorClass }: StatCardProps) => {
  // Pull the active currency from the store
  const currency = useFinanceStore((state) => state.currency);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">
          {/* Use our new formatter here! */}
          {formatCurrency(amount, currency)}
        </h3>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
        {icon}
      </div>
    </div>
  );
};