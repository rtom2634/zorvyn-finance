import { useFinanceStore } from '../../store/useFinanceStore';
import { Shield, User } from 'lucide-react';

export const RoleSwitcher = () => {
  const { role, setRole } = useFinanceStore();

  return (
    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
      <button
        onClick={() => setRole('Admin')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          role === 'Admin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <Shield size={16} />
        Admin
      </button>
      <button
        onClick={() => setRole('Viewer')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          role === 'Viewer' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <User size={16} />
        Viewer
      </button>
    </div>
  );
};