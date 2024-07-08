const express = require("express");
const {
  index,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionByMonthWise,
  getAllEntites,
} = require("../controllers/transaction/transaction.controller");
const { isLoggedIn, isAdmin } = require("../middleware/Auth");
const { errorLogger } = require("../middleware/Logger");

const router = express.Router();

router.use(errorLogger);

router.use(isLoggedIn);
router.get("/", index);
router.get("/getAllTransaction", getAllEntites);
router.post("/", createTransaction);
router.get("/monthwise", getTransactionByMonthWise);
router
  .route("/:id")
  .put(updateTransaction)
  .delete(deleteTransaction)
  .get(getTransactionById);

module.exports = router;
