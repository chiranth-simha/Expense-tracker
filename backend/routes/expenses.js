const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Create expense (public)
router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;
    if (!title || amount == null) return res.status(400).json({ message: 'Title and amount are required' });
    const expense = new Expense({ title, amount, category, date, notes });
    await expense.save();
    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update expense
router.put('/:id', async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/authMiddleware');

// Add expense
router.post('/', auth, async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, user: req.user.id });
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all user expenses
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update expense
router.put('/:id', auth, async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
