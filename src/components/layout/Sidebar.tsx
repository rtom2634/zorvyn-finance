import { useFinanceStore, Tab } from '../../store/useFinanceStore';
import { 
  LayoutDashboard, 
  ReceiptText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { activeTab, setActiveTab } = useFinanceStore();

  const menuItems: { id: Tab; label: string; icon: any }[] = [
    { id: 'Dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { id: 'Transactions', label: 'Transactions', icon: <ReceiptText size={22} /> },
    { id: 'Settings', label: 'Settings', icon: <Settings size={22} /> },
  ];

  return (
    <aside 
      className={`h-screen bg-slate-900 text-slate-400 border-r border-slate-800 transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
        <div className="bg-indigo-600 p-2 rounded-xl text-white">
          <TrendingUp size={24} />
        </div>
        {!isCollapsed && (
          <span className="text-white font-black text-xl tracking-tighter">FINTRACK</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === item.id 
                ? 'bg-indigo-600/10 text-indigo-400' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            {!isCollapsed && <span>{item.label}</span>}
            {!isCollapsed && activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            )}
          </button>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-6 border-t border-slate-800/50 hover:text-white flex items-center gap-4 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        {!isCollapsed && <span className="text-sm font-bold">Collapse Menu</span>}
      </button>
    </aside>
  );
};