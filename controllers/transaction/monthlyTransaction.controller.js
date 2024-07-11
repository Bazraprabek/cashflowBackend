const Transaction = require("../../models/Transaction");
const { Sequelize, Op } = require("sequelize");

class monthlyTransactionController {
  static async getTransactionByMonthWise(req, res) {
    const { year, bankId } = req.query;

    try {
      // Construct the conditions based on bankId
      const conditions = {
        [Sequelize.Op.and]: [
          Sequelize.where(
            Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "issuedAt"')),
            year
          ),
          {
            [Sequelize.Op.or]: [
              { type: "deposit", toBankAccountId: bankId },
              { type: "withdraw", fromBankAccountId: bankId },
              {
                type: "transfer",
                [Sequelize.Op.or]: [
                  { fromBankAccountId: bankId },
                  { toBankAccountId: bankId },
                ],
              },
            ],
          },
        ],
      };

      // Query to get the transactions by month
      const results = await Transaction.findAll({
        attributes: [
          [
            Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "issuedAt"')),
            "month",
          ],
          [Sequelize.fn("SUM", Sequelize.col("amount")), "total_amount"],
          [Sequelize.fn("COUNT", Sequelize.col("id")), "total_transactions"],
          "type",
        ],
        where: conditions,
        group: [
          Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "issuedAt"')),
          "type",
        ],
        order: [
          [
            Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "issuedAt"')),
            "ASC",
          ],
        ],
      });

      // Create an array for all 12 months with initial values
      const monthlyResults = Array.from({ length: 12 }, (_, index) => ({
        month: index + 1,
        total_deposit_amount: 0,
        total_withdraw_amount: 0,
        total_transfer_amount: 0,
        total_deposit_transactions: 0,
        total_withdraw_transactions: 0,
        total_transfer_transactions: 0,
        total_transactions: 0,
      }));

      // Populate the monthlyResults with the actual query results
      results.forEach((result) => {
        const month = result.get("month");
        const totalAmount = parseFloat(result.get("total_amount"));
        const totalTransactions = parseInt(
          result.get("total_transactions"),
          10
        );
        const transactionType = result.get("type");

        if (transactionType === "deposit") {
          monthlyResults[month - 1].total_deposit_amount += totalAmount;
          monthlyResults[month - 1].total_deposit_transactions +=
            totalTransactions;
        } else if (transactionType === "withdraw") {
          monthlyResults[month - 1].total_withdraw_amount += totalAmount;
          monthlyResults[month - 1].total_withdraw_transactions +=
            totalTransactions;
        } else if (transactionType === "transfer") {
          monthlyResults[month - 1].total_transfer_amount += totalAmount;
          monthlyResults[month - 1].total_transfer_transactions +=
            totalTransactions;
        }
        // Add to the overall total transactions for the month
        monthlyResults[month - 1].total_transactions += totalTransactions;
      });

      res.status(200).json(monthlyResults);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = monthlyTransactionController;
