const express = require("express");
const {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  deleteCurrency,
  updateCurrency,
} = require("../controllers/Master/Currency.controller");
const { isAdmin } = require("../middleware/Auth");
const router = express.Router();

router.route("/createCurrency").post(isAdmin, createCurrency);
router.route("/getAllCurrencies").get(getAllCurrencies);
router
  .route("/:id")
  .get(getCurrencyById)
  .delete(isAdmin, deleteCurrency)
  .put(isAdmin, updateCurrency);

module.exports = router;
