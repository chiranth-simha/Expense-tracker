const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (with basic retry)
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));

app.get('/', (req, res) => res.send('Expense Tracker API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
