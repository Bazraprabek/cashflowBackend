const express = require("express");
const {
  createWallet,
  deleteWallet,
  getAllWallet,
  getWalletById,
  updateWallet,
} = require("../controllers/finance/Wallet.controller");

const CatchAsync = require("../middleware/CatchAsync");
const { isAdmin, isLoggedIn } = require("../middleware/Auth");
const { errorLogger } = require("../middleware/Logger");

const router = express.Router();

router.route("/createWallet").post(isAdmin, createWallet);

router.route("/getAllWallet").get(
  isAdmin,
  CatchAsync(async (req, res, next) => {
    await getAllWallet(req, res, next);
  })
);

router
  .route("/:id")
  .get(
    isLoggedIn,
    CatchAsync(async (req, res, next) => {
      await getWalletById(req, res, next);
    })
  )
  .delete(
    isAdmin,
    CatchAsync(async (req, res, next) => {
      await deleteWallet(req, res, next);
    })
  )
  .put(
    isAdmin,
    CatchAsync(async (req, res, next) => {
      await updateWallet(req, res, next);
    })
  );

router.use(errorLogger);
module.exports = router;
