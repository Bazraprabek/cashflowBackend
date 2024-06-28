const userModel = require("../models/User");
const CRUD = require("./shared/CrudOperation");

class UserController {
  static async createuser(req, res) {
    CRUD.createEntity(req, res, userModel);
  }

  static async getAllUser(req, res) {
    CRUD.getAllEntites(req, res, userModel);
  }

  static async getUserById(req, res) {
    CRUD.getEntityById(req, res, userModel);
  }

  static async updateUser(req, res) {
    CRUD.updateEntity(
      req,
      res,
      userModel,
      function (updatedValue, currentModel) {
        currentModel.name = updatedValue.name;
        return currentModel;
      }
    );
  }

  static async deleteUser(req, res) {
    CRUD.deleteEntity(req, res, userModel);
  }
}

module.exports = UserController;
