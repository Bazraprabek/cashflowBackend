const AppError = require("../middleware/AppError");

const throwError = (msg, code, next) => {
  return next(new AppError(msg), code);
};

class Const {
  static unAuthorizedError = (next) => {
    return throwError(
      "You donot have that privilige to do such action",
      401,
      next
    );
  };

  static noTokenError = (next) => {
    return throwError(
      "Please signin with your registered account!!!",
      401,
      next
    );
  };

  static entityAlreadyExistsError = (next) => {
    return throwError(
      "Given entity has already been registered, try with new one !!!",
      400,
      next
    );
  };

  static entityPropsMissingError = (next) => {
    return throwError("Please fill the required fields !!!", 400, next);
  };

  static searchEntityMissingError = (next) => {
    return throwError(
      "There were no records present that matches the field you provided !!!",
      400,
      next
    );
  };
}

module.exports = Const;
