const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  date: { type: Date, default: Date.now },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  recurring: { type: Boolean, default: false }
});

module.exports = mongoose.model('Expense', expenseSchema);
