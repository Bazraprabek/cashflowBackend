const { CrudOperation } = require("../shared/CrudOperation");
const investmentModel = require("../../models/finance/Investment");
const {
  entityPropsMissingError,
  entityAlreadyExistsError,
} = require("../../utils/Const");
const AppError = require("../../middleware/AppError");

class Investment {
  static createInvestment(req, res, next) {
    try {
      CrudOperation.createEntity(
        req,
        res,
        next,
        investmentModel,
        async function (data) {
          const { name } = data;
          if (name) {
            const dbResult = await investmentModel.findOne({
              where: { name: name },
            });
            if (dbResult) {
              return entityAlreadyExistsError(next);
            } else {
              return true;
            }
          } else {
            return entityPropsMissingError(next);
          }
        }
      );
    } catch (error) {
      return next(new AppError("Something went wrong"), 500);
    }
  }

  static async getAllInvestment(req, res, next) {
    await CrudOperation.getAllEntites(req, res, next, investmentModel);
  }

  static async getInvestmentById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, investmentModel);
  }

  static async updateInvestment(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      investmentModel,
      function (updatedValue, currentModel) {
        if (currentModel) currentModel.name = updatedValue.name;
        return currentModel;
      }
    );
  }

  static async deleteInvestment(req, res, next) {
    CrudOperation.deleteEntity(req, res, next, investmentModel);
  }
}

module.exports = Investment;
