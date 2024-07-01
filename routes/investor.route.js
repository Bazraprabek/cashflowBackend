const express = require("express");
const { errorLogger } = require("../middleware/Logger");
const CatchAsync = require("../middleware/CatchAsync");
const { isLoggedIn } = require("../middleware/Auth");
const {
  createInvestors,
  deleteInvestors,
  getAllInvestors,
  getInvestorsById,
  updateInvestors,
} = require("../controllers/finance/Investors.controller");

const router = express.Router();

router.route("/createInvestor").post(isLoggedIn, createInvestors);
router.route("/getAllInvestor").get(
  isLoggedIn,
  CatchAsync(async (req, res, next) => {
    await getAllInvestors(req, res, next);
  })
);
router
  .route("/:id")
  .put(
    isLoggedIn,
    CatchAsync(async (req, res, next) => {
      await updateInvestors(req, res, next);
    })
  )
  .delete(
    isLoggedIn,
    CatchAsync(async (req, res, next) => {
      await deleteInvestors(req, res, next);
    })
  )
  .get(
    isLoggedIn,
    CatchAsync(async (req, res, next) => {
      await getInvestorsById(req, res, next);
    })
  );

router.use(errorLogger);
module.exports = router;
