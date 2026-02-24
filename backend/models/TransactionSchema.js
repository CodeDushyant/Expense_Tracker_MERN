const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        maxLength: 70,
        trim: true
    },
    typeOfTransaction: {
        type: String, 
        enum: ["Debit", "Credit"], 
        required: true
    },
    category: { 
        type: String, 
        required: true,
        enum: ["Food","Utilities", "Healthcare", "RecurringExpense","Rent", "EMI", "Subscription", "Other","Transportation","Entertainment"]
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    transactionDate: {
        type: Date, 
        default: Date.now 
    },
    createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 10
    }

}, { timestamps: true }); 

module.exports = mongoose.model('Transaction', TransactionSchema);