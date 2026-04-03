import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useFinanceStore } from '../../store/useFinanceStore';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, loadTransactions } = useFinanceStore();

  // Run once on mount to load our mock API data and sync the theme
  useEffect(() => {
    loadTransactions();
    
    // Force the HTML root to match our persisted theme instantly
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, loadTransactions]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};