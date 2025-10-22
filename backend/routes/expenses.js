const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all expenses for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(new mongoose.Types.ObjectId(req.user.userId));
    const expenses = await Expense.find({ user: userId })
      .sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get expense by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: new mongoose.Types.ObjectId(req.user.userId)
    });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.json(expense);
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new expense
router.post('/', [
  authMiddleware,
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('type').isIn(['income', 'expense']).withMessage('Invalid type'),
  body('category').isIn(['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other Income', 'Food', 'Transportation', 'Entertainment', 'Shopping', 'Healthcare', 'Education', 'Utilities', 'Other Expense']).withMessage('Invalid category'),
  body('date').optional().isISO8601().withMessage('Invalid date format')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, amount, type, category, description, date } = req.body;
    
    const expense = new Expense({
      title,
      amount,
      type: type || 'expense',
      category,
      description,
      date: date || new Date(),
      user: new mongoose.Types.ObjectId(req.user.userId)
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update expense
router.put('/:id', [
  authMiddleware,
  body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('amount').optional().isNumeric().withMessage('Amount must be a number'),
  body('type').optional().isIn(['income', 'expense']).withMessage('Invalid type'),
  body('category').optional().isIn(['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other Income', 'Food', 'Transportation', 'Entertainment', 'Shopping', 'Healthcare', 'Education', 'Utilities', 'Other Expense']).withMessage('Invalid category'),
  body('date').optional().isISO8601().withMessage('Invalid date format')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: new mongoose.Types.ObjectId(req.user.userId)
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { title, amount, type, category, description, date } = req.body;
    
    if (title) expense.title = title;
    if (amount !== undefined) expense.amount = amount;
    if (type) expense.type = type;
    if (category) expense.category = category;
    if (description !== undefined) expense.description = description;
    if (date) expense.date = date;

    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete expense
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: new mongoose.Types.ObjectId(req.user.userId)
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get expenses by category
router.get('/stats/category', authMiddleware, async (req, res) => {
  try {
    console.log('User ID for category stats:', new mongoose.Types.ObjectId(req.user.userId));
    const stats = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);
    
    console.log('Category stats result:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Get category stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get monthly expenses
router.get('/stats/monthly', authMiddleware, async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;
    
    const stats = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.userId),
          date: {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json(stats);
  } catch (error) {
    console.error('Get monthly stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get income vs expense summary
router.get('/stats/summary', authMiddleware, async (req, res) => {
  try {
    console.log('User ID for summary stats:', new mongoose.Types.ObjectId(req.user.userId));
    const summary = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('Summary aggregation result:', summary);
    
    const income = summary.find(s => s._id === 'income') || { total: 0, count: 0 };
    const expense = summary.find(s => s._id === 'expense') || { total: 0, count: 0 };
    
    const result = {
      income: income.total,
      expense: expense.total,
      balance: income.total - expense.total,
      incomeCount: income.count,
      expenseCount: expense.count
    };
    
    console.log('Final summary result:', result);
    res.json(result);
  } catch (error) {
    console.error('Get summary stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
