const express = require("express");
const {
  createBank,
  getAllBank,
  getBankById,
  deleteBank,
  updateBank,
} = require("../controllers/finance/Bank.controller");
const insertBanks = require("../utils/GenBankData");
const { isAdmin, isLoggedIn } = require("../middleware/Auth");
const { errorLogger, logger } = require("../middleware/Logger");
const CatchAsync = require("../middleware/CatchAsync");
const router = express.Router();

router.use(logger);
router.use(errorLogger);
router.route("/createBank").post(isAdmin, createBank);

router.route("/insert").post(
  CatchAsync(async (req, res, next) => {
    await insertBanks(req, res, next);
  })
);

router.route("/getAllBank").get(isLoggedIn, getAllBank);
router
  .route("/:id")
  .get(isLoggedIn, getBankById)
  .delete(isAdmin, deleteBank)
  .put(isAdmin, updateBank);

module.exports = router;
