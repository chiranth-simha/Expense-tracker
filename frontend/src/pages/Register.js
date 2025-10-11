import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { Box, TextField, Button, Typography } from '@mui/material';

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      alert(err.response.data.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '50px auto', padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} sx={{ mb: 2 }} required />
        <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required />
        <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} required />
        <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
      </form>
    </Box>
  );
};

export default Register;
