const express = require("express");
const router = express.Router();
const {
  index,
  createLoan,
  deleteLoan,
  getLoanById,
} = require("../controllers/loan.controller");

router.get("/", index);
router.post("/", createLoan);
router.route("/:id").delete(deleteLoan).get(getLoanById);

module.exports = router;
