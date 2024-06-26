const express = require("express");
const {
  createBank,
  getAllBank,
  getBankById,
  deleteBank,
  updateBank,
} = require("../controllers/finance/Bank.controller");
const router = express.Router();

router.route("/createBank").post(createBank);
router.route("/getAllBank").get(getAllBank);
router.route("/:id").get(getBankById).delete(deleteBank).put(updateBank);

router.route("/").get((req, res) => {
  res.send("Welcome from bank section");
});

module.exports = router;
