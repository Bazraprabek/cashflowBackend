const express = require("express");
const router = express.Router();
const {
  index,
  createLoan,
  deleteLoan,
  getLoanById,
} = require("../controllers/loan.controller");
const { isLoggedIn } = require("../middleware/Auth");

router.get("/", isLoggedIn, index);
router.post("/", isLoggedIn, createLoan);
router.route("/:id", isLoggedIn).delete(deleteLoan).get(getLoanById);

module.exports = router;
