import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const TransactionChart = () => {
  // Pull both transactions and the current currency from the store
  const { transactions, currency } = useFinanceStore();

  // Group transactions by date and sum up the Income and Expenses for each day
  const dataMap = transactions.reduce((acc, tx) => {
    if (!acc[tx.date]) {
      acc[tx.date] = { date: tx.date, Income: 0, Expense: 0 };
    }
    acc[tx.date][tx.type] += tx.amount;
    return acc;
  }, {} as Record<string, { date: string; Income: number; Expense: number }>);

  // Convert that grouped map into an array and sort it chronologically
  const chartData = Object.values(dataMap).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[400px] flex flex-col transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Financial Performance</h3>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Unit: {currency}
        </span>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              dy={10}
              tickFormatter={(str) => {
                const date = new Date(str);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              // Uses our formatter for the Y-Axis labels (rounded to whole numbers)
              tickFormatter={(value) => formatCurrency(value, currency).split('.')[0]}
            />
            <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                // Explicitly typing the formatter to satisfy Recharts' TS requirements
                formatter={(value: any) => {
                const numValue = Number(value);
                return [formatCurrency(numValue, currency), ""] as [string, string];
                }}
               // Better version for Dark Mode support
                contentStyle={{ 
                   borderRadius: '12px', 
                   border: '1px solid #e2e8f0', 
                   boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                   padding: '12px',
                   backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                   color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#1e293b'
                     }}    
                itemStyle={{ fontWeight: 600 }}
            />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingTop: '0', marginTop: '-40px', paddingRight: '10px' }} 
            />
            <Bar 
              name="Income"
              dataKey="Income" 
              fill="#10b981" 
              radius={[6, 6, 0, 0]} 
              maxBarSize={32} 
              animationDuration={1500}
            />
            <Bar 
              name="Expenses"
              dataKey="Expense" 
              fill="#f43f5e" 
              radius={[6, 6, 0, 0]} 
              maxBarSize={32} 
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};