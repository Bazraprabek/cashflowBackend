const { CrudOperation } = require("../shared/CrudOperation");
const { entityPropsMissingError } = require("../../utils/Const");
const User = require("../../models/User");
const UserBank = require("../../models/finance/UserBank");

class UserBankController {
  static createUserBank(req, res, next) {
    CrudOperation.createEntity(req, res, next, UserBank, async function (body) {
      if (body.userId) {
        const userSearch = await User.findByPk(body.userId);
        if (userSearch) {
          return true;
        }
        if (!userSearch) {
          return entityPropsMissingError(next);
        }
      }
    });
  }

  static async getAllUserBank(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, UserBank);
  }

  static async getAllUserOwnBank(req, res, next) {
    CrudOperation.getAllOwnEntity(req, res, next, UserBank);
  }

  static async getUserBankById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, UserBank);
  }

  static async updateUserBank(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      UserBank,
      function (updatedValue, currentModel) {
        if (currentModel) {
          currentModel.bankName = updatedValue.bankName;
          currentModel.currentAmount = updatedValue.currentAmount;
          currentModel.accountId = updatedValue.accountId;
          currentModel.transactionHistory = updatedValue.transactionHistory;
        }
        return currentModel;
      }
    );
  }

  static async deleteUserBank(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, UserBank);
  }
}

module.exports = UserBankController;
