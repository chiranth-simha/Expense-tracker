import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import CategoryChart from '../components/CategoryChart';
import { Plus, TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    incomeCount: 0,
    expenseCount: 0,
    categories: []
  });

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axios.get('/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      console.log('Fetching stats...');
      const [categoryStats, summaryStats] = await Promise.all([
        axios.get('/api/expenses/stats/category'),
        axios.get('/api/expenses/stats/summary')
      ]);

      console.log('Category stats:', categoryStats.data);
      console.log('Summary stats:', summaryStats.data);

      setStats({
        totalIncome: summaryStats.data.income,
        totalExpense: summaryStats.data.expense,
        balance: summaryStats.data.balance,
        incomeCount: summaryStats.data.incomeCount,
        expenseCount: summaryStats.data.expenseCount,
        categories: categoryStats.data
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchExpenses();
      await fetchStats();
    };
    loadData();
  }, [fetchExpenses, fetchStats]);

  const handleAddExpense = async (expenseData) => {
    try {
      const response = await axios.post('/api/expenses', expenseData);
      setExpenses([response.data, ...expenses]);
      toast.success('Transaction added successfully');
      setShowForm(false);
      await fetchStats();
    } catch (error) {
      toast.error('Failed to add transaction');
    }
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      const response = await axios.put(`/api/expenses/${id}`, expenseData);
      setExpenses(expenses.map(expense => 
        expense._id === id ? response.data : expense
      ));
      toast.success('Transaction updated successfully');
      setEditingExpense(null);
      await fetchStats();
    } catch (error) {
      toast.error('Failed to update transaction');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await axios.delete(`/api/expenses/${id}`);
        setExpenses(expenses.filter(expense => expense._id !== id));
        toast.success('Transaction deleted successfully');
        await fetchStats();
      } catch (error) {
        toast.error('Failed to delete transaction');
      }
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Track and manage your income and expenses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Income</p>
                <p className="text-2xl font-semibold text-green-600">
                  +₹{stats.totalIncome.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                <p className="text-2xl font-semibold text-red-600">
                  -₹{stats.totalExpense.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Wallet className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Balance</p>
                <p className={`text-2xl font-semibold ${
                  stats.balance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ₹{stats.balance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.incomeCount + stats.expenseCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary btn-lg flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Expense Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <ExpenseForm
              expense={editingExpense}
              onSubmit={editingExpense ? 
                (data) => handleUpdateExpense(editingExpense._id, data) :
                handleAddExpense
              }
              onCancel={closeForm}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Expense List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
            </div>
            <div className="card-content">
              <ExpenseList
                expenses={expenses}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
              />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Expenses by Category</h3>
            </div>
            <div className="card-content">
              <CategoryChart data={stats.categories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
