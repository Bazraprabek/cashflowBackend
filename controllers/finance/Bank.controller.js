const BankModel = require("../../models/finance/Bank");
const CRUD = require("../shared/CrudOperation");
const { errorHandler } = require("../../middleware/CatchAsync");
const AppError = require("../../middleware/AppError");

class BankController {
  static async createBank(req, res) {
    CRUD.createEntity(
      req,
      res,
      BankModel,
      errorHandler(async function (body) {
        let nameValidation = false;
        let dbValidation = false;
        let mainValidation = false;

        const dbResult = await BankModel.findOne({
          where: { bankName: body.bankName },
        });
        if (dbResult) {
          nameValidation = true;
          throw new AppError("Name has already been created", 404);
        } else {
          mainValidation = true;
        }
        return nameValidation;
      })
    );
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
        currentModel.accountAvailable = updatedValue.accountAvailable;
        currentModel.interestRate = updatedValue.interestRate;
        return currentModel;
      }
    );
  }

  static async deleteBank(req, res) {
    CRUD.deleteEntity(req, res, BankModel);
  }
}

module.exports = BankController;
