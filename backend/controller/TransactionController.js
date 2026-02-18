const Transaction = require('../models/TransactionSchema');
const mongoose = require('mongoose');
const MonthlyExpense = require("../models/monthlyExpenseSchema");
const sendMail = require("../utils/sendMail");
const User = require("../models/User");
const Expense = require("../models/ExpenseLimitSchema");
exports.TransactionController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, typeOfTransaction, category, amount } = req.body;

    if (!title || !typeOfTransaction || !category || !amount) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const transaction = await Transaction.create({
      userId,
      title,
      typeOfTransaction,
      category,
      amount
    });

    const now = new Date();

    // ✅ DAILY
    const startOfDay = new Date(now);
    startOfDay.setHours(0,0,0,0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23,59,59,999);

    // ✅ WEEK → MONDAY TO SUNDAY
    const day = now.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + diffToMonday);
    startOfWeek.setHours(0,0,0,0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23,59,59,999);

    // ✅ MONTH → 1 TO LAST
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0,0,0,0);

    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    endOfMonth.setHours(23,59,59,999);

    const user = await User.findById(userId);

    // 🧮 TOTALS
    const dailyTotal = await Transaction.aggregate([
      { $match: { userId, createdAt: { $gte: startOfDay, $lte: endOfDay } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const weeklyTotal = await Transaction.aggregate([
      { $match: { userId, createdAt: { $gte: startOfWeek, $lte: endOfWeek } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const monthlyTotal = await Transaction.aggregate([
      { $match: { userId, createdAt: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const dTotal = dailyTotal[0]?.total || 0;
    const wTotal = weeklyTotal[0]?.total || 0;
    const mTotal = monthlyTotal[0]?.total || 0;

    // 🚨 LIMIT CHECK
    const limitDoc = await Expense.findOne({ userId });

    if (dTotal > limitDoc.dailyLimit) {
      await sendMail(user.email, "Daily limit exceeded", `Total: ₹${dTotal}`);
    }

    if (wTotal > limitDoc.weeklyLimit) {
      await sendMail(user.email, "Weekly limit exceeded", `Total: ₹${wTotal}`);
    }

    if (mTotal > limitDoc.monthlyLimit) {
      await sendMail(user.email, "Monthly limit exceeded", `Total: ₹${mTotal}`);
    }

    // 📊 MONTHLY COLLECTION UPDATE
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    await MonthlyExpense.findOneAndUpdate(
      { userId, month, year },
      { $inc: { totalAmount: amount, totalTransaction: 1 } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      data: transaction,
      message: "Transaction created & limits checked"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.getTransaction = async (req, res) => {
  try {
    const id = req.params.id; 
    
    const transactions = await Transaction.find({ userId: id }).sort({ createdAt: -1 });

    if (!transactions || transactions.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No transactions found"
      });
    }

    res.status(200).json({
      success: true,
      data: transactions,
      message: "Successfully fetched transactions"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is required"
      });
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found"
      });
    }

    const amount = transaction.amount;
    const userId = transaction.userId;

    const date = new Date(transaction.createdAt);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    await MonthlyExpense.findOneAndUpdate(
      { userId, month, year },
      { $inc: { totalAmount: -amount , totalTransaction: -1 } }
    );

    await Transaction.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Transaction deleted & monthly expense updated"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting the transaction"
    });
  }
};
