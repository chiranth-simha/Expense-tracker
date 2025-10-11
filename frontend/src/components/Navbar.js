import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <nav style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', background: '#1976d2', color: 'white' }}>
      <h2>Expense Tracker</h2>
      {user && <div>
        <span>{user.name}</span>
        <button onClick={logout} style={{ marginLeft: '10px', padding: '5px' }}>Logout</button>
      </div>}
    </nav>
  );
};

export default Navbar;
