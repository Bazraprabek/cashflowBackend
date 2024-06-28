const walletModel = require("../../models/finance/Wallet");
const crud = require("../shared/CrudOperation");

const AppError = require("../../middleware/AppError");

class WalletController {
  static createWallet(req, res, next) {
    crud.createEntity(req, res, walletModel, next, async function (body) {
      let mainValidation = false;
      if (body.name) {
        const dbResult = await walletModel.findOne({
          where: { name: body.name },
        });
        if (dbResult) {
          return next(new AppError("Name has already been created", 408));
        } else {
          console.log("Result not found");
          mainValidation = true;
          return mainValidation;
        }
      } else {
        return next(new AppError("please provide the required field", 500));
      }
    });
  }

  static async getAllWallet(req, res) {
    crud.getAllEntites(req, res, walletModel);
  }

  static async getWalletById(req, res) {
    crud.getEntityById(req, res, walletModel);
  }

  static async updateWallet(req, res) {
    crud.updateEntity(
      req,
      res,
      walletModel,
      function (updatedValue, currentModel) {
        currentModel.name = updatedValue.name;
        return currentModel;
      }
    );
  }

  static async deleteWallet(req, res) {
    crud.deleteEntity(req, res, walletModel);
  }
}

module.exports = WalletController;
