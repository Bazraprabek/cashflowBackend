const express = require("express");
const UserController = require("../controllers/user.controller");
const authController = require("../controllers/auth/auth.controller");
const { errorLogger } = require("../middleware/Logger");
const CatchAsync = require("../middleware/CatchAsync");
const { isLoggedIn } = require("../middleware/Auth");

const router = express.Router();

router.post("/", UserController.createuser);
router.get("/", UserController.getAllUser);
router
  .route("/:id")
  .get(UserController.getUserById)
  .put(isLoggedIn, UserController.updateUser)
  .delete(UserController.deleteUser);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/forgot-password", authController.forgotPassword);

router.use(errorLogger);
module.exports = router;
