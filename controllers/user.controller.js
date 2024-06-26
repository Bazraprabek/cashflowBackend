const userModel = require("../models/User");
const {
  entityAlreadyExistsError,
  entityPropsMissingError,
} = require("../utils/Const");
const { CrudOperation } = require("./shared/CrudOperation");

class UserController {
  static createuser(req, res, next) {
    CrudOperation.createEntity(
      req,
      res,
      next,
      userModel,
      async function (data) {
        console.log(data);
        let validation = false;
        if (data) {
          if (data.username && data.email && data.password) {
            const dbResult = await userModel.findOne({
              where: { username: data.username },
            });
            if (dbResult) {
              entityAlreadyExistsError(next);
            } else {
              validation = true;
              return validation;
            }
          } else {
            entityPropsMissingError(next);
          }
        } else {
          entityPropsMissingError(next);
        }
      }
    );
  }

  static async getAllUser(req, res, next) {
    CrudOperation.getAllEntites(req, res, next, userModel);
  }

  static async getUserById(req, res, next) {
    CrudOperation.getEntityById(req, res, next, userModel);
  }

  static async updateUser(req, res, next) {
    CrudOperation.updateEntity(
      req,
      res,
      next,
      userModel,
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
