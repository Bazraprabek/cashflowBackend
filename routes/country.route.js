const express = require("express");
const {
  createCountry,
  getAllCountries,
  getCountryById,
  deleteCountry,
  updateCountry,
} = require("../controllers/Master/Country.controller");
const { isAdmin } = require("../middleware/Auth");
const { errorLogger } = require("../middleware/Logger");
const router = express.Router();

router.route("/createCountry").post(createCountry);
router.route("/getAllCountries").get(getAllCountries);
router
  .route("/:id")
  .get(getCountryById)
  .delete(isAdmin, deleteCountry)
  .put(isAdmin, updateCountry);
router.use(errorLogger);
module.exports = router;
