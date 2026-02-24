const cron = require("node-cron");
const Recurring = require("../models/RecurringExpenseSchema");
const sendMail = require("../utils/sendMail");

// Daily Expense → every day at 9 PM
cron.schedule("0 21 * * *", async () => {
    await sendRecurringReminder("daily");
});

// Weekly Expense → every Monday at 9 PM
cron.schedule("0 21 * * 1", async () => {
    await sendRecurringReminder("weekly");
});

// Monthly Expense → every 3rd day of month at 9 PM
cron.schedule("0 21 3 * *", async () => {
    await sendRecurringReminder("monthly");
});

// Yearly Unpaid → every 10th day of month at 9 PM
cron.schedule("0 21 10 * *", async () => {
    await sendRecurringReminder("yearly");
});

// Monthly Expense → every 3rd day of month at 9 PM
cron.schedule("0 21 3 * *", async () => {
    await sendRecurringReminder("monthly");
});

// Yearly Unpaid → every 10th day of month at 9 PM
cron.schedule("0 21 10 * *", async () => {
    await sendRecurringReminder("yearly");
});

async function sendRecurringReminder(frequency) {
    const expenses = await Recurring.find({
        isActive: true,
        frequency: frequency,  // filter by frequency
    }).populate("user");

    console.log(`${frequency} Expenses count:`, expenses.length);

    for (let exp of expenses) {
        if (!exp.user?.email) continue;

        await sendMail(
            exp.user.email,
            "Recurring Expense Reminder",
            `
            <h3>${exp.title} Pending</h3>
            <p>Amount: ₹${exp.amount}</p>
            <p>Please pay your ${exp.frequency} expense.</p>
            `
        );
        console.log(`Reminder sent to: ${exp.user.email}`);
    }

    console.log(`${frequency} reminders sent`);
}