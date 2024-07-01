const investorModel = require("../../models/finance/Investors");
const { CrudOperation } = require("../shared/CrudOperation");

class Investors {
  static createInvestors(req, res, next) {
    CrudOperation.createEntity(
      req,
      res,
      next,
      investorModel,
      async function (data) {
        if (data) {
          return true;
        }
      }
    );
  }
  static async getAllInvestors(req, res, next) {
    await CrudOperation.getAllEntites(req, res, next, investorModel);
  }

  static async getInvestorsById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, investorModel);
  }

  static async updateInvestors(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      investorModel,
      function (updatedValue, currentModel) {
        if (currentModel) currentModel.name = updatedValue.name;
        return currentModel;
      }
    );
  }

  static async deleteInvestors(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, investorModel);
  }
}

module.exports = Investors;
