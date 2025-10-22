import React, { useState } from 'react';
import { Calendar, DollarSign, Tag, FileText, X } from 'lucide-react';

const ExpenseForm = ({ expense, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: expense?.title || '',
    amount: expense?.amount || '',
    category: expense?.category || 'Food',
    description: expense?.description || '',
    date: expense?.date ? new Date(expense.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  });

  const categories = [
    'Food', 'Transportation', 'Entertainment', 'Shopping', 
    'Healthcare', 'Education', 'Utilities', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {expense ? 'Edit Expense' : 'Add New Expense'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="title"
              name="title"
              required
              className="input pl-10"
              placeholder="Enter expense title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              id="amount"
              name="amount"
              required
              min="0"
              step="0.01"
              className="input pl-10"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              id="category"
              name="category"
              required
              className="input pl-10"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              id="date"
              name="date"
              required
              className="input pl-10"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="input"
            placeholder="Enter expense description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="btn btn-primary btn-md flex-1"
          >
            {expense ? 'Update Expense' : 'Add Expense'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline btn-md flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
