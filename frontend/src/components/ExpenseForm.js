import { useState } from 'react';
import API from '../api/api';
import { TextField, Button, MenuItem, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';

const categories = ['Food', 'Travel', 'Shopping', 'Entertainment', 'Bills', 'Other'];

const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    recurring: false
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setExpense(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/expenses', expense);
      alert('Expense added!');
      setExpense({ title: '', amount: '', category: '', date: '', recurring: false });
      window.location.reload(); // reload to refresh list (can improve with state)
    } catch (err) {
      alert('Error adding expense');
      console.log(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '20px auto', padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white', animation: 'fadeIn 1s' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Add New Expense</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Title" name="title" value={expense.title} onChange={handleChange} sx={{ mb: 2 }} required />
        <TextField fullWidth label="Amount" type="number" name="amount" value={expense.amount} onChange={handleChange} sx={{ mb: 2 }} required />
        <TextField
          select
          fullWidth
          label="Category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        >
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
        <TextField fullWidth type="date" name="date" value={expense.date} onChange={handleChange} sx={{ mb: 2 }} required />
        <FormControlLabel
          control={<Checkbox name="recurring" checked={expense.recurring} onChange={handleChange} />}
          label="Recurring"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Add Expense</Button>
      </form>
    </Box>
  );
};

export default ExpenseForm;
