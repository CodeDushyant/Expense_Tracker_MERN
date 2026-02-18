const MonthlyExpense = require("../models/monthlyExpenseSchema");

exports.getMonthlyExpense = async (req, res) => {
  try {
    const id = req.user._id;

    const monthlyExpenses = await MonthlyExpense
      .find({ userId: id })
      .sort({ year: -1, month: -1 });
    if (!monthlyExpenses || monthlyExpenses.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No Monthly Expenses found"
      });
    }

    res.status(200).json({
      success: true,
      data: monthlyExpenses,
      message: "Successfully fetched Monthly Expenses"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};