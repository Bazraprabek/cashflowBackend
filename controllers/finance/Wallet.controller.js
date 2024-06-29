const walletModel = require("../../models/finance/Wallet");
const { CrudOperation } = require("../shared/CrudOperation");
const AppError = require("../../middleware/AppError");

class WalletController {
  static createWallet(req, res, next) {
    CrudOperation.createEntity(
      req,
      res,
      walletModel,
      next,
      async function (body) {
        let mainValidation = false;
        if (body.name) {
          const dbResult = await walletModel.findOne({
            where: { name: body.name },
          });
          if (dbResult) {
            return next(
              new AppError(
                `Provided entity name "${body.name}" has already been registered. Try with other options.. `,
                408
              )
            );
          } else {
            console.log("Result not found");
            mainValidation = true;
            return mainValidation;
          }
        } else {
          console.log("root");
          return next(new AppError("please provide the required field", 500));
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
