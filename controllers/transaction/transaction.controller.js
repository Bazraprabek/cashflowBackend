const Finance = require("../../models/Finance");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const CRUD = require("../shared/CrudOperation");
const { Sequelize } = require("sequelize");

class transactionController {
  static async index(req, res) {
    CRUD.getAllEntites(req, res, Transaction);
  }

  static async getTransactionById(req, res) {
    CRUD.getEntityById(req, res, Transaction);
  }

  static async getTransactionByMonthWise(req, res) {
    const { year, type } = req.query;

    try {
      // Query to get the transactions by month
      const results = await Transaction.findAll({
        attributes: [
          [
            Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "issuedAt"')),
            "month",
          ],
          [Sequelize.fn("SUM", Sequelize.col("amount")), "total_amount"],
        ],
        where: {
          [Sequelize.Op.and]: [
            Sequelize.where(
              Sequelize.fn(
                "EXTRACT",
                Sequelize.literal('YEAR FROM "issuedAt"')
              ),
              year
            ),
            type && { status: type },
          ],
        },
        group: [
          Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "issuedAt"')),
        ],
        order: [
          [
            Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "issuedAt"')),
            "ASC",
          ],
        ],
      });

      // Create an array for all 12 months with total_amount set to 0
      const monthlyResults = Array.from({ length: 12 }, (_, index) => ({
        month: index + 1,
        total_amount: 0,
      }));

      // Populate the monthlyResults with the actual query results
      results.forEach((result) => {
        const month = result.get("month");
        const totalAmount = result.get("total_amount");
        monthlyResults[month - 1].total_amount = totalAmount;
      });

      res.status(200).json(monthlyResults);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async createTransaction(req, res) {
    const {
      userId,
      fullname,
      financeId,
      accountNumber,
      status,
      type,
      amount,
      issuedAt,
      remarks,
    } = req.body;

    try {
      // Ensure the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Ensure the bank exists or create it
      let financeRecord = await Finance.findOne({
        where: { id: financeId, accountNumber },
      });
      // if (!financeRecord) {
      //   financeRecord = await Finance.create({ name: "Prabhu", accountNumber });
      // }
      if (!financeRecord) {
        return res.status(404).json({ error: "Finance not found" });
      }

      // Create the transaction
      const transaction = await Transaction.create({
        userId: user.id,
        fullname,
        financeId: financeRecord.id,
        status,
        type,
        amount,
        issuedAt,
        remarks,
      });

      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateTransaction(req, res) {
    CRUD.updateEntity(
      req,
      res,
      Transaction,
      function (updatedValue, currentModel) {
        currentModel.status = updatedValue.status;
        currentModel.type = updatedValue.type;
        currentModel.amount = updatedValue.amount;
        currentModel.remarks = updatedValue.remarks;
        return currentModel;
      }
    );
  }

  static async deleteTransaction(req, res) {
    CRUD.deleteEntity(req, res, Transaction);
  }
}

module.exports = transactionController;
