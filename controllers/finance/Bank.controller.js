const BankModel = require("../../models/finance/Bank");
const { CrudOperation } = require("../shared/CrudOperation");
const {
  entityAlreadyExistsError,
  entityPropsMissingError,
  searchForEntityData,
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

        if (body.bankName) {
          // const dbResult = await BankModel.findOne({
          //   where: { bankName: body.bankName },
          // });
          // if (dbResult) {
          //   if (!body.swiftcode) {
          //     return entityPropsMissingError(next);
          //   }
          //   if (body.swiftcode) {
          //     const uniqueCheck = await BankModel.findOne({
          //       where: { swiftcode: body.swiftcode },
          //     });
          //     if (uniqueCheck) {
          //       console.log("Match Found");
          //     }
          //   }
          //   nameValidation = true;
          //   return entityAlreadyExistsError(next);

          // } else {
          //   nameValidation = true;
          //   return nameValidation;
          // }
          const dataResult = await BankModel.findOne({
            where: {
              bankName: body.bankName,
            },
          });
          if (!dataResult) {
            if (body.swiftcode) {
              const uniqueResult = await BankModel.findOne({
                where: {
                  swiftcode: body.swiftcode,
                },
              });
              if (uniqueResult) {
                return entityAlreadyExistsError(next);
              }
              if (!uniqueResult) {
                console.log("return true");
                return true;
              }
            } else {
              return entityPropsMissingError(next);
            }
          }
          if (dataResult) {
            return entityAlreadyExistsError(next);
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

  static async deleteBank(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, BankModel);
  }
}

module.exports = BankController;
