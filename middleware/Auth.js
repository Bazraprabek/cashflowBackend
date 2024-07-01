const User = require("../models/User");
const { verifyToken } = require("../utils/jwt");
const AppError = require("./AppError");

class Auth {
  static isAdmin(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      let userToken = token.split(" ")[1];
      const decode = verifyToken(userToken);
      if (decode.role === "admin") next();
      else {
        return next(new AppError("You are not authorized"), 400);
      }
    } else {
      return next(new AppError("Please authorized first", 404));
    }
  }

  static async isLoggedIn(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      let userToken = token.split(" ")[1];
      try {
        const decode = verifyToken(userToken);
        console.log(decode);

        const findUser = await User.findOne({
          where: { username: decode.username },
        });

        if (findUser) {
          req.userId = decode.id;
          next();
        } else {
          return next(new AppError("Please sign in to your account.", 400));
        }
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return next(
            new AppError("Your session has expired. Please sign in again.", 401)
          );
        } else {
          return next(new AppError("You are not authorized", 401));
        }
      }
    } else {
      return next(new AppError("Please authorize first", 404));
    }
  }
}

module.exports = Auth;
