const mongoose = require('mongoose');
const recurringSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  frequency: {
    type: String,
    enum: ["Monthly", "Weekly","Yearly","Daily"],
    required: true
  },

  dueDay: {
  type: Number,
  min: 1,
  max: 31,
  required: true
},

  reminderIntervalDays: {
    type: Number,
    default: 3
  },

  isPaidThisMonth: {
    type: Boolean,
    default: false
  },

  lastPaidMonth: {
    type: String
  },

  lastReminderDate: {
    type: Date
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Recurring", recurringSchema);