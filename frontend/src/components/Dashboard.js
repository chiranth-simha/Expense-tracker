import { useState, useEffect } from 'react';
import API from '../api/api';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Chart from './Chart'; // Reusable chart component

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await API.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  // Total expense
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Category-wise summary
  const categoryData = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryData),
    datasets: [{
      label: 'Expenses by Category',
      data: Object.values(categoryData),
      backgroundColor: 'rgba(25, 118, 210, 0.6)',
      borderColor: 'rgba(25, 118, 210, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Expenses by Category' },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <Box sx={{ maxWidth: 900, margin: '20px auto', animation: 'fadeIn 1s' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Total Expenses</Typography>
            <Typography variant="h4" color="primary">${total.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Chart type="bar" data={data} options={options} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
