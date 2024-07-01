// utils/scheduleTasks.js
const cron = require("node-cron");
const EMIPayment = require("../models/EMIPayment");
const Loan = require("../models/Loan");

// Function to process payments
async function processEMIPayments() {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Find all loans that have a due date of today
    const dueLoans = await Loan.findAll({
      where: {
        nextPaymentDate: today,
      },
    });

    for (const loan of dueLoans) {
      // Create a new EMI payment
      await EMIPayment.create({
        loanId: loan.id,
        paymentDate: today,
        amountPaid: loan.emiAmount,
      });

      // Update the loan's next payment date
      const nextPaymentDate = new Date(loan.nextPaymentDate);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1); // assuming monthly EMI
      loan.nextPaymentDate = nextPaymentDate.toISOString().split("T")[0];

      await loan.save();
    }
  } catch (error) {
    console.error("Error processing EMI payments:", error);
  }
}

// Schedule the task to run every day at midnight
cron.schedule("0 0 * * *", processEMIPayments);
