const mongoose = require("mongoose");

const monthlyExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  month: Number,   // 1 – 12
  year: Number,
  totalAmount: {
    type: Number,
    default: 0
  },
  totalTransaction:{
    type:Number,
    default:0
  }
}, { timestamps: true });

monthlyExpenseSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("MonthlyExpense", monthlyExpenseSchema);
