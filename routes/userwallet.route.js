const express = require("express");
const { errorLogger, logger } = require("../middleware/Logger");
const { isLoggedIn, isAdmin } = require("../middleware/Auth");
const {
  createUserWallet,
  deleteUserWallet,
  getAllUserOwnWallet,
  getAllUserWallet,
  getUserWalletById,
  updateUserWallet,
} = require("../controllers/finance/UserWallet.controller");
const CatchAsync = require("../middleware/CatchAsync");

const router = express.Router();

router.use(logger);

router
  .route("/")
  .post(isLoggedIn, createUserWallet)
  .get(isLoggedIn, getAllUserOwnWallet);

router.route("/alluserWallet").get(isAdmin, getAllUserWallet);

router
  .route("/:id")
  .get(isLoggedIn, getUserWalletById)

  .delete(isLoggedIn, deleteUserWallet)
  .put(isLoggedIn, updateUserWallet);

// Error logging

router.use(errorLogger);
module.exports = router;
