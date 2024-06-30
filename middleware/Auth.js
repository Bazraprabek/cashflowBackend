const User = require("../models/User");
const { unAuthorizedError, noTokenError } = require("../utils/Const");
const { verifyToken, verifyTokens } = require("../utils/jwt");
const jwt = require("jsonwebtoken");
const AppError = require("./AppError");

class Auth {
  static isAdmin(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      let userToken = token.split(" ")[1];
      const decode = verifyTokens(userToken, req, next);
      console.log("admin decode done");
      if (decode.role === "admin") {
        next();
      } else {
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
      const decode = verifyTokens(userToken, req, next);
      console.log(decode);
      next();
    } else {
      console.log("no token");
      return noTokenError(next);
    }
  }
}

module.exports = Auth;
