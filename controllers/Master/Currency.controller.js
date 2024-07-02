const AppError = require("../../middleware/AppError");
const CurrencyModel = require("../../models/Master/Currency");
const { CrudOperation } = require("../shared/CrudOperation");

class CurrencyController {
  static async createCurrency(req, res, next) {
    CrudOperation.createEntity(
      req,
      res,
      next,
      CurrencyModel,

      async function (body) {
        let mainValidation = false;
        if (body.currencyName) {
          const dbResult = await CurrencyModel.findOne({
            where: { currencyName: body.currencyName },
          });
          if (dbResult) {
            return next(
              new AppError(
                `Provided entity name "${body.currencyName}" has already been registered. Try with other options.. `,
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

  static async getAllCurrencies(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, CurrencyModel);
  }

  static async getCurrencyById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, CurrencyModel);
  }

  static async updateCurrency(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      CurrencyModel,
      function (updatedValue, currentModel) {
        currentModel.currencyName = updatedValue.currencyName;
        currentModel.currencyCode = updatedValue.currencyCode;
        currentModel.countryId = updatedValue.countryId;
        return currentModel;
      }
    );
  }

  static async deleteCurrency(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, CurrencyModel);
  }
}

module.exports = CurrencyController;
