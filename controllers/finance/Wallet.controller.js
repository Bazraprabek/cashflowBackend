const walletModel = require("../../models/finance/Wallet");
const CRUD = require("../shared/CrudOperation");

class WalletController {
  static async createWallet(req, res) {
    CRUD.createEntity(req, res, walletModel, function (body) {
      let nameValidation = true;
      let dbValidation = true;
      if (body.name) {
        nameValidation = true;
      } else {
        nameValidation = false;
        dbValidation = false;
      }
      return { nameValidation, dbValidation };
    });
  }

  static async getAllWallet(req, res) {
    CRUD.getAllEntites(req, res, walletModel);
  }

  static async getWalletById(req, res) {
    CRUD.getEntityById(req, res, walletModel);
  }

  static async updateWallet(req, res) {
    CRUD.updateEntity(
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
    CRUD.deleteEntity(req, res, walletModel);
  }
}

module.exports = WalletController;
