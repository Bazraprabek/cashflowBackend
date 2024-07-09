const AppError = require("../../middleware/AppError");
const Finance = require("../../models/Finance");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const UserBank = require("../../models/finance/UserBank");
const { validateTransaction } = require("../../utils/validation");
const { CrudOperation } = require("../shared/CrudOperation");
const { Sequelize } = require("sequelize");

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
            type && { type: type },
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
}

module.exports = transactionController;
