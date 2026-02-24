const ExpenseLimit = require('../models/ExpenseLimitSchema');

exports.getExpenses = async (req, res) => {
  try {
    const id = req.user._id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    const expense = await ExpenseLimit.findOne({ userId: id });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense limit not found"
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
      message: "Successfully fetched expense limit"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.updateExpenses = async (req,res) =>{
  try{
      const userId = req.user.id; 
    const { dailyLimit, weeklyLimit, monthlyLimit } = req.body;

    if (
      dailyLimit == null &&
      weeklyLimit == null &&
      monthlyLimit == null
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one limit is required"
      });
    }

     const expense = await ExpenseLimit.findOneAndUpdate(
  { userId },  
  { dailyLimit, weeklyLimit, monthlyLimit },  
  { new: true, runValidators: true } 
);


    res.status(201).json({
      success: true,
      data: expense,
      message: "Expense limit set successfully"
    });
  }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}