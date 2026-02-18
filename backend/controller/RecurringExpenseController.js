const Recurring = require('../models/RecurringExpenseSchema')
exports.setRecurringExpense = async (req, res) => {
  try {
    const { title, amount, category, dueDay, frequency } = req.body;

    const recurring = await Recurring.create({
      user: req.user._id,
      title,
      amount,
      frequency,
      category,
      dueDay
    });

    res.status(201).json({
      success: true,
      data: recurring
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getRecurringExpense = async (req, res) => {
  try {

    const expenses = await Recurring.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

//update recurring expense
exports.updateRecurring = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, dueDay } = req.body;

    const updated = await Recurring.findByIdAndUpdate(
      id,  // ✅ use _id
      { title, amount, category, dueDay },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Recurring Expense not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
      message: "Recurring Expense updated successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// delete recurring epxense

exports.deleteRecurringExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Recurring.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Recurring Expense not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Recurring Expense deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



exports.markRecurringExpensePaid = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Recurring.findById(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Recurring Expense not found"
      });
    }

    expense.isActive = !expense.isActive;

    const updated = await expense.save();

    res.status(200).json({
      success: true,
      data: updated,
      message: "Recurring Expense status updated"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


