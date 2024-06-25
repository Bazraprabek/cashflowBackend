const express = require("express");
const transactionController = require("../controllers/transaction.controller");

const router = express.Router();

router.get("/", transactionController.index);
router.post("/", transactionController.createTransaction);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
