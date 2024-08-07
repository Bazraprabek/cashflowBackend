const express = require("express");
const {
  index,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionByMonthWise,
  getAllEntites,
  getDepositOfUserBankById,
  getWithdrawOfUserBankById,
} = require("../controllers/transaction/transaction.controller");
const { isLoggedIn, isAdmin } = require("../middleware/Auth");
const { errorLogger } = require("../middleware/Logger");

const router = express.Router();

router.use(isLoggedIn);
router.get("/", index);
router.get("/getAllTransaction", getAllEntites);
router.post("/", createTransaction);
router.get("/monthwise", getTransactionByMonthWise);
router.route("/getDepositOfUserBankById/:id").get(getDepositOfUserBankById);
router.route("/getWithdrawOfUserBankById/:id").get(getWithdrawOfUserBankById);
router
  .route("/:id")
  .put(updateTransaction)
  .delete(deleteTransaction)
  .get(getTransactionById);

router.use(errorLogger);
module.exports = router;
