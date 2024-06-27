class Auth {
  static isAdmin(req, res, next) {
    const admin = "ADMIN";
    if (req.body?.role?.toLowerCase() === admin.toLocaleLowerCase()) {
      next();
    } else {
      return res.status(400).send("You are not authorized");
    }
  }
}

module.exports = Auth;
