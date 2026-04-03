import { useFinanceStore } from '../../store/useFinanceStore';
import { Download, TrendingUp, BarChart3, Lightbulb } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const InsightsSection = () => {
  const { transactions, currency } = useFinanceStore();

  // 1. Logic: Highest Spending Category (Point #5)
  const expenses = transactions.filter(t => t.type === 'Expense');
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  // 2. Logic: Monthly Comparison (Point #5)
  const currentMonth = new Date().getMonth();
  const currentMonthTotal = expenses
    .filter(t => new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  const lastMonthTotal = expenses
    .filter(t => new Date(t.date).getMonth() === currentMonth - 1)
    .reduce((sum, t) => sum + t.amount, 0);

  const isSavingMore = currentMonthTotal < lastMonthTotal;

  // 3. Export to CSV (Point #2)
  const exportToCSV = () => {
    const headers = "Description,Amount,Date,Category,Type\n";
    const rows = transactions.map(t => 
      `${t.description.replace(/,/g, '')},${t.amount},${t.date},${t.category},${t.type}`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FinTrack_Report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-500">
      {/* Category Insight Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
            <TrendingUp size={20} />
          </div>
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 text-xs font-bold bg-slate-100 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white dark:text-slate-300 px-4 py-2 rounded-xl transition-all"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
        
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Top Spending</h3>
        {topCategory ? (
          <div>
            <p className="text-2xl font-black dark:text-white">{topCategory[0]}</p>
            <p className="text-slate-400 text-sm mt-1">
              Total spent: <span className="font-bold text-rose-500">{formatCurrency(topCategory[1], currency)}</span>
            </p>
          </div>
        ) : (
          <p className="text-slate-400 italic">No expense data yet...</p>
        )}
      </div>

      {/* Monthly Observation Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
            <Lightbulb size={20} />
          </div>
          <h3 className="font-bold dark:text-white">Monthly Observation</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">vs. Last Month</span>
            <span className={`text-xs font-bold px-2 py-1 rounded-md ${isSavingMore ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
              {isSavingMore ? 'Lower Spending' : 'Higher Spending'}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isSavingMore 
              ? "Great job! You've spent less this month compared to last. Keep that momentum going to hit your savings goal."
              : "Heads up! Your spending is currently higher than last month. Check your 'Highest Spending' category for potential cuts."}
          </p>
        </div>
      </div>
    </div>
  );
};