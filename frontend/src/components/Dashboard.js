import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import API from '../api/api';
import ExpenseChart from './ExpenseChart';

const Dashboard = () => {
  const [summary, setSummary] = useState({ total: 0, count: 0 });

  const load = async () => {
    try {
      const res = await API.get('/expenses');
      const expenses = res.data || [];
      const total = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
      setSummary({ total, count: expenses.length });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <Box sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Spent</Typography>
            <Typography variant="h4">${summary.total.toFixed(2)}</Typography>
            <Typography variant="body2">{summary.count} expenses</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <ExpenseChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
