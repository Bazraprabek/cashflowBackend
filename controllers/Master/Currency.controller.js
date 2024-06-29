const CurrencyModel = require("../../models/Master/Currency");
const CRUD = require("../shared/CrudOperation");

class CurrencyController {
  static async createCurrency(req, res) {
    CRUD.createEntity(req, res, CurrencyModel);
  }

  static async getAllCurrencies(req, res) {
    CRUD.getAllEntites(req, res, CurrencyModel);
  }

  static async getCurrencyById(req, res) {
    CRUD.getEntityById(req, res, CurrencyModel);
  }

  static async updateCurrency(req, res) {
    CRUD.updateEntity(
      req,
      res,
      CurrencyModel,
      function (updatedValue, currentModel) {
        currentModel.currencyName = updatedValue.currencyName;
        currentModel.currencyCode = updatedValue.currencyCode;
        currentModel.countryId = updatedValue.countryId;
        return currentModel;
      }
    );
  }

  static async deleteCurrency(req, res) {
    CRUD.deleteEntity(req, res, CurrencyModel);
  }
}

module.exports = CurrencyController;
