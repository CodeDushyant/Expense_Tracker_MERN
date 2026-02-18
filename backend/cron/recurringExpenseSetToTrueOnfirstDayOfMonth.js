const cron = require("node-cron");
const Recurring = require("../models/RecurringExpenseSchema");

// --- Daily Expenses: every day at 00:00 ---
cron.schedule("0 0 * * *", async () => {
  try {
    await Recurring.updateMany(
      { frequency: "daily" },
      { $set: { isPaid: false } }
    );
    console.log("Daily expenses marked unpaid");
  } catch (error) {
    console.error("Error marking daily expenses unpaid:", error);
  }
});

// --- Weekly Expenses: every Sunday at 00:00 ---
cron.schedule("0 0 * * 0", async () => {
  try {
    await Recurring.updateMany(
      { frequency: "weekly" },
      { $set: { isPaid: false } }
    );
    console.log("Weekly expenses marked unpaid");
  } catch (error) {
    console.error("Error marking weekly expenses unpaid:", error);
  }
});

// --- Monthly Expenses: every 1st day of month at 00:00 ---
cron.schedule("0 0 1 * *", async () => {
  try {
    await Recurring.updateMany(
      { frequency: "monthly" },
      { $set: { isPaid: false } }
    );
    console.log("Monthly expenses marked unpaid");
  } catch (error) {
    console.error("Error marking monthly expenses unpaid:", error);
  }
});

// --- Yearly Expenses: every Jan 1 at 00:00 ---
cron.schedule("0 0 1 1 *", async () => {
  try {
    await Recurring.updateMany(
      { frequency: "yearly" },
      { $set: { isPaid: false } }
    );
    console.log("Yearly expenses marked unpaid");
  } catch (error) {
    console.error("Error marking yearly expenses unpaid:", error);
  }
});
