const AppError = require("../../middleware/AppError");
const Finance = require("../../models/Finance");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const UserBank = require("../../models/finance/UserBank");
const { validateTransaction } = require("../../utils/validation");
const { CrudOperation } = require("../shared/CrudOperation");
const { Sequelize, Op } = require("sequelize");

class transactionController {
  static async index(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, Transaction, true);
  }

  static async getAllEntites(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, Transaction, false);
  }

  static async getTransactionById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, Transaction);
  }

  static async getTransactionsByType(req, res, next) {
    const userId = req.query.id;
    const transactionType = req.query.type;

    // Validate the transaction type
    const validTypes = ["deposit", "withdraw", "transfer"];
    let where = {};

    if (transactionType) {
      if (!validTypes.includes(transactionType)) {
        return res.status(400).json({ error: "Invalid transaction type" });
      }

      // Update the where clause based on the transaction type
      if (transactionType === "deposit") {
        where = {
          toBankAccountId: userId,
          type: transactionType,
        };
      } else if (transactionType === "withdraw") {
        where = {
          fromBankAccountId: userId,
          type: transactionType,
        };
      } else {
        // Handle transfer type (assuming it can be either toBankAccountId or fromBankAccountId)
        where = {
          type: transactionType,
          [Op.or]: [{ toBankAccountId: userId }, { fromBankAccountId: userId }],
        };
      }
    } else {
      // If no transaction type is specified, include all transactions related to the user
      where = {
        [Op.or]: [{ toBankAccountId: userId }, { fromBankAccountId: userId }],
      };
    }

    const include = [
      {
        model: UserBank,
        as: "userbank",
        attributes: {
          exclude: ["updatedAt", "createAt"],
        },
      },
    ];

    // Call the utility function to get all matching transactions with pagination
    await CrudOperation.getAllEntityWithCustomIdInLimit(
      req,
      res,
      next,
      Transaction,
      where,
      include
    );
  }

  static async createTransaction(req, res, next) {
    await CrudOperation.createEntity(
      req,
      res,
      next,
      Transaction,
      async (body) => {
        let validatedData = await validateTransaction(req, next, body);
        console.log(validatedData);
        if (validatedData) {
          req.body = {
            ...validatedData,
            userId: req.userId,
          };
          return { mainValidation: true };
        } else {
          return false;
        }
      }
    );
  }

  static async updateTransaction(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      Transaction,
      async function (updatedValue, currentModel) {
        try {
          console.log(currentModel.userId, req.userId);
          const user = currentModel.userId === req.userId;

          if (!user) {
            return next(new AppError("Unauthorized User", 401));
          }

          const validatedData = await validateTransaction(
            req,
            next,
            updatedValue
          );
          if (validatedData) {
            currentModel.type = validatedData.type;
            currentModel.cashType = validatedData.cashType;
            currentModel.amount = validatedData.amount;
            currentModel.remarks = validatedData.remarks;
            currentModel.issuedAt = validatedData.issuedAt;
            currentModel.toAccountId = validatedData.toAccountId;
            currentModel.fromAccountId = validatedData.fromAccountId;
            return currentModel;
          }
        } catch (error) {
          return next(error);
        }
      }
    );
  }

  static async deleteTransaction(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, Transaction);
  }

  static async getDepositOfUserBankById(req, res, next) {
    const userId = req.params.id;
    console.log("deposit", userId);
    const where = { toBankAccountId: userId };

    const include = [
      {
        model: UserBank,
        as: "userbank",
        attributes: {
          exclude: ["updatedAt", "createAt"],
        },
      },
    ];

    CrudOperation.getAllEntityWithCustomIdInLimit(
      req,
      res,
      next,
      Transaction,
      where,
      include
    );
  }

  static async getWithdrawOfUserBankById(req, res, next) {
    const userId = req.params.id;
    console.log(userId);
    const where = { fromAccountId: userId };
    const include = [
      {
        model: UserBank,
        as: "UserBank",
        attributes: {
          exclude: ["updatedAt", "createAt"],
        },
      },
    ];
    CrudOperation.getAllEntityWithCustomIdInLimit(
      req,
      res,
      next,
      Transaction,
      where,
      include
    );
  }

  static async getTransactionByMonthWise(req, res) {
    const { year } = req.query;

    try {
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
        where: {
          [Sequelize.Op.and]: [
            Sequelize.where(
              Sequelize.fn(
                "EXTRACT",
                Sequelize.literal('YEAR FROM "issuedAt"')
              ),
              year
            ),
          ],
        },
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

module.exports = transactionController;
