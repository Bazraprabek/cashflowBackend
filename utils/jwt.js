const jwt = require("jsonwebtoken");
const AppError = require("../middleware/AppError");

const generateToken = (user, expireDate) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: expireDate || "30d",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyTokens = (userToken, req, next) => {
  return jwt.verify(userToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("errorrrrrrr::::", err);
      let errorMessage = "Invalid token. Please log in again.";
      return next(new AppError(errorMessage, 401));
    } else {
      req.user = decoded;
      return decoded;
    }
  });
};

module.exports = {
  generateToken,
  verifyToken,
  verifyTokens,
};
