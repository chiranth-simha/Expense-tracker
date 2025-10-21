import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Box, TextField, Button, Typography } from '@mui/material';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/home');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Login failed';
      alert(msg);
    }
  };

  return (
    <Box sx={{ maxWidth: 420, margin: '60px auto', padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required />
        <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>Login</Button>
        <Button component={Link} to="/register" fullWidth>Register</Button>
      </form>
    </Box>
  );
};

export default Login;
