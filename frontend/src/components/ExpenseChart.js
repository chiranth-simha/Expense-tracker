import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import API from '../api/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ExpenseChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  const load = async () => {
    try {
      const res = await API.get('/expenses');
      const expenses = res.data || [];
      const byCategory = {};
      expenses.forEach(e => { const c = e.category || 'Other'; byCategory[c] = (byCategory[c] || 0) + Number(e.amount || 0); });
      const labels = Object.keys(byCategory);
      const values = labels.map(l => byCategory[l]);
      setData({ labels, datasets: [{ label: 'Amount by Category', data: values, backgroundColor: 'rgba(25,118,210,0.7)' }] });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  return <Bar data={data} />;
};

export default ExpenseChart;
