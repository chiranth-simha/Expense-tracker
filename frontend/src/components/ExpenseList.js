import React from 'react';
import { Edit, Trash2, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const getCategoryColor = (category, type) => {
    if (type === 'income') {
      const colors = {
        Salary: 'bg-green-100 text-green-800',
        Freelance: 'bg-emerald-100 text-emerald-800',
        Investment: 'bg-teal-100 text-teal-800',
        Business: 'bg-cyan-100 text-cyan-800',
        Gift: 'bg-lime-100 text-lime-800',
        'Other Income': 'bg-green-100 text-green-800'
      };
      return colors[category] || 'bg-green-100 text-green-800';
    } else {
      const colors = {
        Food: 'bg-red-100 text-red-800',
        Transportation: 'bg-blue-100 text-blue-800',
        Entertainment: 'bg-purple-100 text-purple-800',
        Shopping: 'bg-pink-100 text-pink-800',
        Healthcare: 'bg-green-100 text-green-800',
        Education: 'bg-yellow-100 text-yellow-800',
        Utilities: 'bg-gray-100 text-gray-800',
        'Other Expense': 'bg-indigo-100 text-indigo-800'
      };
      return colors[category] || 'bg-gray-100 text-gray-800';
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <DollarSign className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
        <p className="text-gray-500">Start by adding your first expense!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div key={expense._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">
                  {expense.title}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category, expense.type)}`}>
                  {expense.category}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                  expense.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {expense.type === 'income' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {expense.type}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4" />
                  <span className={`font-semibold text-lg ${
                    expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
                </div>
              </div>
              
              {expense.description && (
                <p className="text-sm text-gray-600">{expense.description}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(expense)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit expense"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(expense._id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete expense"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
