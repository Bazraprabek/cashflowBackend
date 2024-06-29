const User = require("../models/User");
const { CrudOperation } = require("./shared/CrudOperation");

class UserController {
  static async createuser(req, res, next) {
    CrudOperation.createEntity(req, res, next, User, function (body) {
      let nameValidation = true;
      let dbValidation = true;
      return { nameValidation, dbValidation };
    });
  }

  static async getAllUser(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, User);
  }

  static async getUserById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, User);
  }

  static async updateUser(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      User,
      function (updatedValue, currentModel) {
        currentModel.name = updatedValue.name;
        return currentModel;
      }
    );
  }

  static async deleteUser(req, res) {
    CrudOperation.deleteEntity(req, res, User);
  }
}

module.exports = UserController;
