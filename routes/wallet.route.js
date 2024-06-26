const express = require("express");
const {
  createWallet,
  deleteWallet,
  getAllWallet,
  getWalletById,
  updateWallet,
} = require("../controllers/finance/Wallet.controller");
const { isAdmin } = require("../middleware/Auth");
const router = express.Router();

router.route("/createWallet").post(isAdmin, createWallet);
router.route("/getAllWallet").get(getAllWallet);
router
  .route("/:id")
  .get(getWalletById)
  .delete(isAdmin, deleteWallet)
  .put(isAdmin, updateWallet);

router.route("/").get((req, res) => {
  res.send("Welcome from wallet section");
});

module.exports = router;
