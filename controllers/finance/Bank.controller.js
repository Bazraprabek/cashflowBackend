const BankModel = require("../../models/Bank");
const CRUD = require("../shared/CrudOperation");

class BankController {
  static async createBank(req, res) {
    CRUD.createEntity(req, res, BankModel);
  }

  static async getAllBank(req, res) {
    CRUD.getAllEntites(req, res, BankModel);
  }

  static async getBankById(req, res) {
    CRUD.getEntityById(req, res, BankModel);
  }

  static async updateBank(req, res) {
    CRUD.updateEntity(
      req,
      res,
      BankModel,
      function (updatedValue, currentModel) {
        currentModel.bankName = updatedValue.bankName;
        currentModel.address = updatedValue.address;
        currentModel.email = updatedValue.email;
        currentModel.contact = updatedValue.contact;
        currentModel.website = updatedValue.website;
        currentModel.swiftcode = updatedValue.swiftcode;
        currentModel.abbr = updatedValue.abbr;
        return transaction;
      }
    );
  }

  static async deleteBank(req, res) {
    CRUD.deleteEntity(req, res, BankModel);
  }
}

module.exports = BankController;
