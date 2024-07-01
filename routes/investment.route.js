const express = require("express");
const { errorLogger } = require("../middleware/Logger");
const CatchAsync = require("../middleware/CatchAsync");
const { isLoggedIn } = require("../middleware/Auth");
const {
  createInvestment,
  deleteInvestment,
  getAllInvestment,
  getInvestmentById,
  updateInvestment,
} = require("../controllers/finance/Investment.controller");

const router = express.Router();

router.route("/createInvestment").post(isLoggedIn, createInvestment);
router.route("/getAllInvestment").get(
  isLoggedIn,
  CatchAsync(async (req, res, next) => {
    await getAllInvestment(req, res, next);
  })
);
router
  .route("/:id")
  .put(
    isLoggedIn,
    CatchAsync(async (req, res, next) => {
      await updateInvestment(req, res, next);
    })
  )
  .delete(
    isLoggedIn,
    CatchAsync(async (req, res, next) => {
      await deleteInvestment(req, res, next);
    })
  )
  .get(
    isLoggedIn,
    CatchAsync(async (req, res, next) => {
      await getInvestmentById(req, res, next);
    })
  );

router.use(errorLogger);
module.exports = router;
