const express = require("express");
const loanController = require("../controllers/Loan.controller");

const router = express.Router();

router.post("/loans", loanController.createLoan);
router.get("/loans", loanController.getAllLoans);
router.get("/loans/:id", loanController.getLoanById);
router.put("/loans/:id", loanController.updateLoan);
router.delete("/loans/:id", loanController.deleteLoan);

module.exports = router;
