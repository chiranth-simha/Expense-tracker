import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 1000, margin: '20px auto', padding: '0 16px' }}>
        <Dashboard />
        <ExpenseForm />
        <ExpenseList />
      </div>
    </div>
  );
}

export default Home;
