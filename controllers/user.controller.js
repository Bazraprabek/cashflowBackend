const AppError = require("../middleware/AppError");
const userModel = require("../models/User");
const { CrudOperation } = require("./shared/CrudOperation");

class UserController {
  static createuser(req, res, next) {
    CrudOperation.createEntity(
      req,
      res,
      userModel,
      next,
      async function (data) {
        console.log(data);
        let validation = false;
        if (data) {
          if (data.username && data.email && data.password) {
            const dbResult = await userModel.findOne({
              where: { username: data.username },
            });
            if (dbResult) {
              return next(
                new AppError(
                  `Provided entity name "${data.username}" has already been registered. Try with other options.. `,
                  408
                )
              );
            } else {
              console.log("Result not found");
              validation = true;
              return validation;
            }
          } else {
            return next(
              new AppError("The given field is required to be filled", 404)
            );
          }
        } else {
          return next(new AppError("Please provide the required field", 404));
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
