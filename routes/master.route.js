const express = require("express");
const masterController = require("../controllers/master.controller");

const router = express.Router();

router.get("/", masterController.index);

module.exports = router;
