const express = require("express");
const {
  createWallet,

  // createWallet,
  // deleteWallet,
  // getAllWallet,
  // getWalletById,
  // updateWallet,
} = require("../controllers/finance/Wallet.controller");

const CatchAsync = require("../middleware/CatchAsync");
const { isAdmin } = require("../middleware/Auth");
const router = express.Router();

router.route("/createWallet").post(isAdmin, CatchAsync(createWallet));
// router.route("/getAllWallet").get(getAllWallet);
// router
//   .route("/:id")
//   .get(getWalletById)
//   .delete(isAdmin, deleteWallet)
//   .put(isAdmin, updateWallet);

module.exports = router;
