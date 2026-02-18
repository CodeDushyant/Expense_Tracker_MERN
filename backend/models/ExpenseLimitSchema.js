const mongoose = require('mongoose');

const ExpenseLimitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dailyLimit: {
    type: Number,
    default: 0
  },
  monthlyLimit: {
    type: Number,
    default: 0
  },
  weeklyLimit: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Expense', ExpenseLimitSchema);
