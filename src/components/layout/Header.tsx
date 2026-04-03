import { useFinanceStore } from '../../store/useFinanceStore';
import { Search, Bell, Shield, ShieldAlert } from 'lucide-react';

export const Header = () => {
  const { role, setRole, searchQuery, setSearchQuery } = useFinanceStore();

  return (
    <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between transition-colors">
      <div className="relative w-72">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
        <input 
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Role Switcher (Simulating Login Change) */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button 
            onClick={() => setRole('Admin')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${role === 'Admin' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >
            Admin
          </button>
          <button 
            onClick={() => setRole('Viewer')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${role === 'Viewer' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >
            Viewer
          </button>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
            {/* Hide text on small screens (hidden sm:block) */}
            <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">Kumar Aryan</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-wider">
                 {role} Mode
                </p>
            </div>
                {/* Avatar circle stays visible */}
         <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                         KA
            </div>
        </div>
      </div>
    </header>
  );
};