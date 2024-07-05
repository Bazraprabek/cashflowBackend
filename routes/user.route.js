const express = require("express");
const authController = require("../controllers/auth/auth.controller");
const {
  createuser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { errorLogger } = require("../middleware/Logger");
const { isLoggedIn } = require("../middleware/Auth");

const router = express.Router();

router.post("/", createuser);
router.get("/", getAllUser);
router
  .route("/:id")
  .get(getUserById)
  .put(isLoggedIn, updateUser)
  .delete(deleteUser);

// Auth routes
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/forgot-password", authController.forgotPassword);
router.get("/verify-email", authController.verifyEmailToken);

router.use(errorLogger);

module.exports = router;
