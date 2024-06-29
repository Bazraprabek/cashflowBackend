const express = require("express");
const {
  index,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionByMonthWise,
} = require("../controllers/transaction/transaction.controller");

const router = express.Router();

router.get("/", index);
router.post("/", createTransaction);
router.get("/monthwise", getTransactionByMonthWise);
router
  .route("/:id")
  .put(updateTransaction)
  .delete(deleteTransaction)
  .get(getTransactionById);

module.exports = router;
