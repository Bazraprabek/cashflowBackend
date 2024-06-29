const express = require("express");
const {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  deleteCurrency,
  updateCurrency,
} = require("../controllers/Master/Currency.controller");
const { isAdmin } = require("../middleware/Auth");
const { errorLogger } = require("../middleware/Logger");
const router = express.Router();

router.route("/createCurrency").post(createCurrency);
router.route("/getAllCurrencies").get(getAllCurrencies);
router
  .route("/:id")
  .get(getCurrencyById)
  .delete(isAdmin, deleteCurrency)
  .put(isAdmin, updateCurrency);
router.use(errorLogger);
module.exports = router;
