const User = require("../models/User");
const { unAuthorizedError, noTokenError } = require("../utils/Const");
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
        unAuthorizedError(next);
      }
    } else {
      noTokenError(next);
    }
  }

  static async isLoggedIn(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      let userToken = token.split(" ")[1];
      const decode = verifyToken(userToken);
      if (decode) {
        const findUser = await User.findOne({
          where: { username: decode.username },
        });
        if (findUser) {
          next();
        } else {
          noTokenError(next);
        }
      } else {
        unAuthorizedError(next);
      }
    } else {
      unAuthorizedError(next);
    }
  }
}

module.exports = Auth;
