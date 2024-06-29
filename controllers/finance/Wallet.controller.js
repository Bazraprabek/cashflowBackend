const walletModel = require("../../models/finance/Wallet");
const { CrudOperation } = require("../shared/CrudOperation");
const {
  entityAlreadyExistsError,
  entityPropsMissingError,
} = require("../../utils/Const");

class WalletController {
  static createWallet(req, res, next) {
    CrudOperation.createEntity(
      req,
      res,
      next,
      walletModel,
      async function (body) {
        let mainValidation = false;
        if (body.name) {
          const dbResult = await walletModel.findOne({
            where: { name: body.name },
          });
          if (dbResult) {
            entityAlreadyExistsError(next);
          } else {
            mainValidation = true;
            return mainValidation;
          }
        } else {
          entityPropsMissingError(next);
        }
      }
    );
  }

  static async getAllWallet(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, walletModel);
  }

  static async getWalletById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, walletModel);
  }

  static async updateWallet(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      walletModel,
      function (updatedValue, currentModel) {
        if (currentModel) currentModel.name = updatedValue.name;
        return currentModel;
      }
    );
  }

  static async deleteWallet(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, walletModel);
  }
}

module.exports = WalletController;
