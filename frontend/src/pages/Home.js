import { useState } from 'react';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey(k => k + 1);

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 1000, margin: '20px auto', padding: '0 16px' }}>
        <Dashboard key={refreshKey} />
        <ExpenseForm onAdded={triggerRefresh} />
        <ExpenseList refreshKey={refreshKey} />
      </div>
    </div>
  );
}

export default Home;
