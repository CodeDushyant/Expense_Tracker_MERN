const express = require('express');
const app = express();
const ExpenseTrackerRoutes = require('./routes/ExpenseTrackerRoutes')
const cors = require('cors')
// dotenv
require('dotenv').config();
app.use(express.json());
app.use(cors({
  origin: "*"
}));

require("./cron/recurringNotification");
require("./cron/recurringExpenseSetToTrueOnfirstDayOfMonth");


// cookie parser
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const dbConnect = require('./config/db');
dbConnect();

// PORT
const PORT = process.env.PORT || 4000;


app.use('/api/v1',ExpenseTrackerRoutes)

// routes
app.get('/api/v1', (req, res) => {
    res.send("You are inside of default route of Expense Tracking System");
});

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// listen
app.listen(PORT, () => {
    console.log(`App Running on port ${PORT}`);
});



