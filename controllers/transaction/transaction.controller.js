const AppError = require("../../middleware/AppError");
const Finance = require("../../models/Finance");
const Transaction = require("../../models/Transaction");
const { CrudOperation } = require("../shared/CrudOperation");
const { Sequelize } = require("sequelize");

class transactionController {
  static async index(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, Transaction, true);
  }

  static async getTransactionById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, Transaction);
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

  static async createTransaction(req, res, next) {
    try {
      await CrudOperation.createEntity(
        req,
        res,
        next,
        Transaction,
        async (body) => {
          const {
            type,
            amount,
            issuedAt,
            cashType,
            toAccountId,
            fromAccountId,
            remarks,
          } = body;
          req.body = {
            type,
            amount,
            issuedAt,
            toAccountId,
            fromAccountId,
            cashType,
            userId: req.userId,
            remarks,
          };

          // Check for essential fields
          if (!type || !amount || !issuedAt) {
            return next(
              new AppError("Please provide all the required fields", 400)
            );
          }

          // Validate transaction type and corresponding account IDs
          const typeRequirements = {
            deposit: {
              required: "toAccountId",
              missingMsg: "toAccountId for deposit transactions",
            },
            withdraw: {
              required: "fromAccountId",
              missingMsg: "fromAccountId for withdraw transactions",
            },
            transfer: {
              required: ["toAccountId", "fromAccountId"],
              missingMsg:
                "both toAccountId and fromAccountId for transfer transactions",
            },
          };

          const requirement = typeRequirements[type];
          if (!requirement) {
            return next(
              new AppError(
                "Invalid transaction type. Allowed types are: deposit, withdraw, transfer",
                400
              )
            );
          }

          const requiredFields = Array.isArray(requirement.required)
            ? requirement.required
            : [requirement.required];
          for (const field of requiredFields) {
            if (!body[field]) {
              return next(
                new AppError(`Please provide ${requirement.missingMsg}`, 400)
              );
            }
          }

          // Vlaidate both account
          if (toAccountId === fromAccountId) {
            return next(new AppError(`Both Account cannot be same`, 404));
          }

          // Validate account existence
          const accountIds = [toAccountId, fromAccountId].filter(Boolean);
          for (const accountId of accountIds) {
            const account = await Finance.findByPk(accountId);
            if (!account) {
              return next(new AppError(`Account does not exist.`, 404));
            }
          }

          console.log("Validation passed");
          return { mainValidation: true };
        }
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateTransaction(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
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

  static async deleteTransaction(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, Transaction);
  }
}

module.exports = transactionController;
