const AppError = require("../../middleware/AppError");
const Country = require("../../models/Master/Country");
const CurrencyModel = require("../../models/Master/Currency");
const {
  entityPropsMissingError,
  searchEntityMissingError,
} = require("../../utils/Const");
const { CrudOperation } = require("../shared/CrudOperation");

class CurrencyController {
  static async createCurrency(req, res, next) {
    CrudOperation.createEntity(
      req,
      res,
      next,
      CurrencyModel,

      async function (body) {
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
            console.log(body);

            const keyExists = await Country.findOne({
              where: {
                id: body.countryId,
              },
            });
            console.log("keyExists", keyExists);
            if (keyExists) {
              console.log("Found");
              return true;
            } else {
              console.log("not found");
              return entityPropsMissingError(next);
            }
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
      async function (updatedValue, currentModel) {
        if (updatedValue) {
          if (updatedValue.countryId) {
            const countryExits = await Country.findOne({
              where: {
                id: updatedValue.countryId,
              },
            });
            console.log(countryExits);
            if (countryExits) {
              currentModel.currencyName = updatedValue.currencyName;
              currentModel.currencyCode = updatedValue.currencyCode;
              currentModel.countryId = updatedValue.countryId;
              return currentModel;
            } else {
              return searchEntityMissingError(next);
            }
          }
        } else {
          return entityPropsMissingError(next);
        }
      }
    );
  }

  static async deleteCurrency(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, CurrencyModel);
  }
}

module.exports = CurrencyController;
