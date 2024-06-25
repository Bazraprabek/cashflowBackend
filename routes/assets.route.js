const express = require("express");
const assetsController = require("../controllers/assets.controller");

const router = express.Router();

router.get("/", assetsController.index);

module.exports = router;
