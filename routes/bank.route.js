const express = require("express");
const {
  createBank,
  getAllBank,
  getBankById,
  deleteBank,
  updateBank,
} = require("../controllers/finance/Bank.controller");
const { isAdmin } = require("../middleware/Auth");
const router = express.Router();

router.route("/createBank").post(isAdmin, createBank);
router.route("/getAllBank").get(getAllBank);
router
  .route("/:id")
  .get(getBankById)
  .delete(isAdmin, deleteBank)
  .put(isAdmin, updateBank);

router.route("/").get((req, res) => {
  res.send("Welcome from bank section");
});

module.exports = router;
