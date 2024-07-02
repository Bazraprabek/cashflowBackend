const AppError = require("../../middleware/AppError");
const CountryModel = require("../../models/Master/Country");
const Currency = require("../../models/Master/Currency");
const { foriegnKeyUsed } = require("../../utils/Const");
const { CrudOperation } = require("../shared/CrudOperation");

class CountryController {
  static async createCountry(req, res, next) {
    CrudOperation.createEntity(
      req,
      res,
      next,
      CountryModel,

      async function (body) {
        let mainValidation = false;
        if (body.countryName) {
          const dbResult = await CountryModel.findOne({
            where: { countryName: body.countryName },
          });
          if (dbResult) {
            return next(
              new AppError(
                `Provided entity name "${body.countryName}" has already been registered. Try with other options.. `,
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

  static async getAllCountries(req, res, next) {
    console.log("called");
    CrudOperation.getAllEntites(req, res, next, CountryModel);
  }

  static async getCountryById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, CountryModel);
  }

  static async updateCountry(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      CountryModel,
      function (updatedValue, currentModel) {
        currentModel.countryName = updatedValue.countryName;
        currentModel.countryCode = updatedValue.countryCode;
        return currentModel;
      }
    );
  }

  static async deleteCountry(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, CountryModel);
  }
}

module.exports = CountryController;
