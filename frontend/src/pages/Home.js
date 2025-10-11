import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const Home = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <p>Please login</p>;

  return (
    <div>
      <Navbar />
      <Dashboard />
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}

export default Home;
