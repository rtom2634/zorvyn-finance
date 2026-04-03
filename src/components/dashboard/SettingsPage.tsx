import { useFinanceStore } from '../../store/useFinanceStore';
import { Moon, Sun, IndianRupee, DollarSign, Euro, PoundSterling } from 'lucide-react';

export const SettingsPage = () => {
  const { theme, setTheme, currency, setCurrency } = useFinanceStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your preferences and app appearance.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-8">
        
        {/* Theme Toggle */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Appearance</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all ${
                theme === 'light' ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500' : 'bg-slate-50 dark:bg-slate-900/50 text-slate-500 border-2 border-transparent hover:bg-slate-100'
              }`}
            >
              <Sun size={20} /> Light Mode
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all ${
                theme === 'dark' ? 'bg-indigo-900/40 text-indigo-400 border-2 border-indigo-500' : 'bg-slate-50 dark:bg-slate-900/50 text-slate-500 border-2 border-transparent hover:bg-slate-700'
              }`}
            >
              <Moon size={20} /> Dark Mode
            </button>
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-700" />

        {/* Currency Selector */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Currency</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: 'USD', icon: <DollarSign size={18} />, label: 'US Dollar' },
              { id: 'INR', icon: <IndianRupee size={18} />, label: 'Indian Rupee' },
              { id: 'EUR', icon: <Euro size={18} />, label: 'Euro' },
              { id: 'GBP', icon: <PoundSterling size={18} />, label: 'British Pound' },
            ].map((cur) => (
              <button
                key={cur.id}
                onClick={() => setCurrency(cur.id as any)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl font-bold transition-all ${
                  currency === cur.id ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 border-2 border-indigo-500' : 'bg-slate-50 dark:bg-slate-900/50 text-slate-500 border-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cur.icon}
                <span className="text-sm">{cur.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};