import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Expense Tracker</Typography>
        {user ? (
          <>
            <Typography variant="body1" sx={{ marginRight: 2 }}>{user.name}</Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Typography variant="body2">Not logged in</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
