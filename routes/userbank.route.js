const express = require("express");
const { errorLogger, logger } = require("../middleware/Logger");
const { isLoggedIn, isAdmin } = require("../middleware/Auth");
const {
  createUserBank,
  getAllUserBank,
  getUserBankById,
  deleteUserBank,
  updateUserBank,
  getAllUserOwnBank,
} = require("../controllers/finance/UserBank.controller");

const router = express.Router();
router.use(errorLogger);
router.use(logger);

router
  .route("/")
  .post(isLoggedIn, createUserBank)
  .get(isLoggedIn, getAllUserOwnBank);

router.route("/alluserBank").get(isAdmin, getAllUserBank);

router
  .route("/:id")
  .get(isLoggedIn, getUserBankById)
  .delete(isLoggedIn, deleteUserBank)
  .put(isLoggedIn, updateUserBank);

// Error logging

module.exports = router;
