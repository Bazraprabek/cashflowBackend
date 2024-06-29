const CountryModel = require("../../models/Master/Country");
const CRUD = require("../shared/CrudOperation");

class CountryController {
  static async createCountry(req, res) {
    CRUD.createEntity(req, res, CountryModel);
  }

  static async getAllCountries(req, res) {
    CRUD.getAllEntites(req, res, CountryModel);
  }

  static async getCountryById(req, res) {
    CRUD.getEntityById(req, res, CountryModel);
  }

  static async updateCountry(req, res) {
    CRUD.updateEntity(
      req,
      res,
      CountryModel,
      function (updatedValue, currentModel) {
        currentModel.countryName = updatedValue.countryName;
        currentModel.countryCode = updatedValue.countryCode;
        return currentModel;
      }
    );
  }

  static async deleteCountry(req, res) {
    CRUD.deleteEntity(req, res, CountryModel);
  }
}

module.exports = CountryController;
