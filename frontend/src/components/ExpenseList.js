import { useState, useEffect } from 'react';
import API from '../api/api';
import { Box, Typography, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await API.get('/expenses');
    setExpenses(res.data);
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await API.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '20px auto', padding: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Your Expenses</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Recurring</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(exp => (
            <TableRow key={exp._id} hover>
              <TableCell>{exp.title}</TableCell>
              <TableCell>${exp.amount}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
              <TableCell>{exp.recurring ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <IconButton color="primary"><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(exp._id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ExpenseList;
