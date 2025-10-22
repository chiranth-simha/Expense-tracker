const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense'],
    default: 'expense'
  },
  category: {
    type: String,
    required: true,
    enum: [
      // Income categories
      'Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other Income',
      // Expense categories
      'Food', 'Transportation', 'Entertainment', 'Shopping', 'Healthcare', 'Education', 'Utilities', 'Other Expense'
    ]
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);
