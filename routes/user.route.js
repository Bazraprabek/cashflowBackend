const express = require("express");
const UserController = require("../controllers/user.controller");
const authController = require("../controllers/auth/auth.controller");

const router = express.Router();

router.post("/", UserController.createuser);
router.get("/", UserController.getAllUser);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;
