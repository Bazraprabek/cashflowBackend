const express = require("express");
const {
  index,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionByMonthWise,
  getAllEntites,
  getTransactionsByType,
} = require("../controllers/transaction/transaction.controller");
const { isLoggedIn, isAdmin } = require("../middleware/Auth");
const { errorLogger } = require("../middleware/Logger");

const router = express.Router();

router.use(isLoggedIn);
router.get("/", index);
router.get("/getAllTransaction", getAllEntites);
router.post("/", createTransaction);
router.get("/monthwise", getTransactionByMonthWise);
router.get("/userBank", getTransactionsByType);
router
  .route("/:id")
  .put(updateTransaction)
  .delete(deleteTransaction)
  .get(getTransactionById);

router.use(errorLogger);
module.exports = router;
