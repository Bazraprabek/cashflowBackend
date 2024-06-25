const express = require("express");
const financeController = require("../controllers/finance.controller");

const router = express.Router();

router.get("/", financeController.index);

module.exports = router;
