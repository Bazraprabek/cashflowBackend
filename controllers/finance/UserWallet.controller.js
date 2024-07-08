const { CrudOperation } = require("../shared/CrudOperation");
const { entityPropsMissingError } = require("../../utils/Const");
const User = require("../../models/User");
const UserWallet = require("../../models/finance/UserWallet");

class UserWalletController {
  static createUserWallet(req, res, next) {
    CrudOperation.createEntity(
      req,
      res,
      next,
      UserWallet,
      async function (body) {
        if (body.userId) {
          const userSearch = await User.findByPk(body.userId);
          if (userSearch) {
            return true;
          }
          if (!userSearch) {
            return entityPropsMissingError(next);
          }
        }
      }
    );
  }

  static async getAllUserWallet(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, UserWallet);
  }

  static async getAllUserOwnWallet(req, res, next) {
    CrudOperation.getAllOwnEntity(req, res, next, UserWallet);
  }

  static async getUserWalletById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, UserWallet);
  }

  static async updateUserWallet(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      UserWallet,
      function (updatedValue, currentModel) {
        if (currentModel) {
          currentModel.walletName = updatedValue.walletName;
          currentModel.currentAmount = updatedValue.currentAmount;
          currentModel.accountId = updatedValue.accountId;
          currentModel.transactionHistory = updatedValue.transactionHistory;
        }
        return currentModel;
      }
    );
  }

  static async deleteUserWallet(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, UserWallet);
  }
}

module.exports = UserWalletController;
