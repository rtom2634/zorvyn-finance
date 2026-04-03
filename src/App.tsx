import { Layout } from './components/layout/Layout';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { TransactionTable } from './components/dashboard/TransactionTable';
import { SettingsPage } from './components/dashboard/SettingsPage';
import { useFinanceStore } from './store/useFinanceStore';

function App() {
  const activeTab = useFinanceStore((state) => state.activeTab);

  return (
    <Layout>
      {activeTab === 'Dashboard' && <DashboardOverview />}
      {activeTab === 'Transactions' && <TransactionTable />}
      {activeTab === 'Settings' && <SettingsPage />}
    </Layout>
  );
}

export default App;