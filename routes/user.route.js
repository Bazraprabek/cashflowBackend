const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();

router.post("/", UserController.createuser);
router.get("/", UserController.getAllUser);

module.exports = router;
