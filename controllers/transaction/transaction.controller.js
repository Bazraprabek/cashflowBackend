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
    CrudOperation.getAllEntities(req, res, next, Transaction, false);
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
    await CrudOperation.getAllEntitiesWithConditions(
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
}

module.exports = transactionController;
