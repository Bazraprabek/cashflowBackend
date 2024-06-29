const express = require("express");
const {
  createBank,
  getAllBank,
  getBankById,
  deleteBank,
  updateBank,
} = require("../controllers/finance/Bank.controller");
const { isAdmin } = require("../middleware/Auth");
const { errorLogger } = require("../middleware/Logger");
const router = express.Router();

router.route("/createBank").post(isAdmin, createBank);
router.route("/getAllBank").get(getAllBank);
router
  .route("/:id")
  .get(getBankById)
  .delete(isAdmin, deleteBank)
  .put(isAdmin, updateBank);

router.use(errorLogger);

module.exports = router;
