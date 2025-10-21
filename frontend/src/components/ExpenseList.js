import { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../api/api';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const load = async () => {
    try {
      const res = await API.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, [refreshKey]);

  const remove = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await API.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(e => e._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (!expenses.length) return <Typography>No expenses yet</Typography>;

  return (
    <Box sx={{ mt: 2, p: 2, boxShadow: 1, borderRadius: 1, backgroundColor: 'white' }}>
      <List>
        {expenses.map(exp => (
          <ListItem key={exp._id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => remove(exp._id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={`${exp.title} — $${exp.amount}`} secondary={`${exp.category || ''} • ${new Date(exp.date).toLocaleDateString()}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ExpenseList;
