const { unAuthorizedError, noTokenError } = require("../utils/Const");
const { verifyTokens } = require("../utils/jwt");

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
      if (decode) {
        req.userId = decode.id;
      }
      next();
    } else {
      console.log("no token");
      return noTokenError(next);
    }
  }
}

module.exports = Auth;
