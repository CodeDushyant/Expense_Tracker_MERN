const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth')
const { usersController } = require('../controller/usersController');
const { TransactionController , getTransaction ,deleteTransaction } = require('../controller/TransactionController');
const {getExpenses , updateExpenses}= require('../controller/ExpenseLimitController')
const {verifyEmail} = require('../utils/verifyEmail')
const {resendOtp} = require('../controller/usersController')
const {login} =  require('../controller/LoginController');
const {updatePassword,resetPassword , verifyOtpForReset,authOtpToken} =  require('../controller/UpdatePasswordController');
const {setRecurringExpense,
    getRecurringExpense,
    updateRecurring,
    deleteRecurringExpense,
    markRecurringExpensePaid
} = require('../controller/RecurringExpenseController');
const {getMonthlyExpense} = require('../controller/MonthlyExpenseController');

// user
router.post("/user/signin", usersController);
router.post("/user/otpverify", verifyEmail);
router.post("/user/resendotp", resendOtp );
router.post("/user/login" , login);
router.post("/user/updatePassword",updatePassword);
router.post("/user/verifyOtpforResetPassword",verifyOtpForReset);
router.post("/user/resetPassword",authOtpToken, resetPassword);
// Transaction Routes
router.post("/userTransaction/Transaction",auth , TransactionController);
router.get("/userTransaction/Transaction/:id",auth,getTransaction);
router.delete("/userTransaction/Transaction/delete/:id",auth,deleteTransaction);
// Expense Routes
// router.post("/Expense",auth,ExpenseLimitController);
router.get("/expense/expense-details",auth,getExpenses);
router.put("/expense/Expense-update",auth,updateExpenses);
// recurring expenses
router.get('/recurringExpense/:id',auth,getRecurringExpense);
router.post('/recurringExpense/create',auth,setRecurringExpense);
router.put('/recurringExpense/update/:id',auth,updateRecurring);
router.delete('/recurringExpense/delete/:id',auth,deleteRecurringExpense);
router.post('/recurringExpense/mark/:id',auth,markRecurringExpensePaid);
// monthly Expense
router.get('/monthlyExpense',auth,getMonthlyExpense)
module.exports = router;