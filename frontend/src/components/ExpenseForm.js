import { useState } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import API from '../api/api';

const ExpenseForm = ({ onAdded }) => {
  const [form, setForm] = useState({ title: '', amount: '', category: '', date: '', notes: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = { ...form, amount: parseFloat(form.amount) };
      await API.post('/expenses', payload);
      setForm({ title: '', amount: '', category: '', date: '', notes: '' });
      if (onAdded) onAdded();
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not add expense');
    }
  };

  return (
    <Box sx={{ mb: 3, p: 2, boxShadow: 1, borderRadius: 1, backgroundColor: 'white' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Amount" name="amount" type="number" value={form.amount} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Category" name="category" value={form.category} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Date" name="date" type="date" InputLabelProps={{ shrink: true }} value={form.date} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Notes" name="notes" value={form.notes} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">Add Expense</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ExpenseForm;
