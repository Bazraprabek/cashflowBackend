const express = require("express");
const {
  createWallet,
  deleteWallet,
  getAllWallet,
  getWalletById,
  updateWallet,
} = require("../controllers/finance/Wallet.controller");
const router = express.Router();

router.route("/createWallet").post(createWallet);
router.route("/getAllWallet").get(getAllWallet);
router.route("/:id").get(getWalletById).delete(deleteWallet).put(updateWallet);

router.route("/").get((req, res) => {
  res.send("Welcome from wallet section");
});

module.exports = router;
