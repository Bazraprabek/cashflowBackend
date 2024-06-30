const BankModel = require("../../models/finance/Bank");
const { CrudOperation } = require("../shared/CrudOperation");
const {
  entityAlreadyExistsError,
  entityPropsMissingError,
} = require("../../utils/Const");

class BankController {
  static createBank(req, res, next) {
    CrudOperation.createEntity(
      req,
      res,
      next,
      BankModel,
      async function (body) {
        let nameValidation = false;
        if (body) {
          const dbResult = await BankModel.findOne({
            where: { bankName: body.bankName },
          });
          if (dbResult) {
            nameValidation = true;
            return entityAlreadyExistsError(next);
          } else {
            mainValidation = true;
            return nameValidation;
          }
        } else {
          return entityPropsMissingError(next);
        }
      }
    );
  }

  static async getAllBank(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, BankModel);
  }

  static async getBankById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, BankModel);
  }

  static async updateBank(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      BankModel,
      function (updatedValue, currentModel) {
        if (currentModel) {
          currentModel.bankName = updatedValue.bankName;
          currentModel.address = updatedValue.address;
          currentModel.email = updatedValue.email;
          currentModel.contact = updatedValue.contact;
          currentModel.website = updatedValue.website;
          currentModel.swiftcode = updatedValue.swiftcode;
          currentModel.abbr = updatedValue.abbr;
          currentModel.accountAvailable = updatedValue.accountAvailable;
          currentModel.interestRate = updatedValue.interestRate;
        }
        return currentModel;
      }
    );
  }

  static async deleteBank(req, res) {
    CrudOperation.deleteEntity(req, res, BankModel);
  }
}

module.exports = BankController;
