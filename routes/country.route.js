const express = require("express");
const {
  createCountry,
  getAllCountries,
  getCountryById,
  deleteCountry,
  updateCountry,
} = require("../controllers/Master/Country.controller");
const { isAdmin } = require("../middleware/Auth");
const router = express.Router();

router.route("/createCountry").post(isAdmin, createCountry);
router.route("/getAllCountries").get(getAllCountries);
router
  .route("/:id")
  .get(getCountryById)
  .delete(isAdmin, deleteCountry)
  .put(isAdmin, updateCountry);

module.exports = router;
