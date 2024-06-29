const express = require("express");
const {
  index,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionByMonthWise,
} = require("../controllers/transaction/transaction.controller");
const { isLoggedIn, isAdmin } = require("../middleware/Auth");

const router = express.Router();

router.get("/", isLoggedIn, index);
router.post("/", isLoggedIn, createTransaction);
router.get("/monthwise", isLoggedIn, getTransactionByMonthWise);
router
  .route("/:id", isLoggedIn)
  .put(updateTransaction)
  .delete(deleteTransaction)
  .get(getTransactionById);

module.exports = router;
