const express = require("express");
const assetController = require("../controllers/assets.controller");
const { isLoggedIn } = require("../middleware/Auth");

const router = express.Router();

router.post("/", isLoggedIn, assetController.createAsset);
router.get("/", isLoggedIn, assetController.getAllAssets);
router.get("/:id", isLoggedIn, assetController.getAssetById);
router.put("/:id", isLoggedIn, assetController.updateAsset);
router.delete("/:id", isLoggedIn, assetController.deleteAsset);

module.exports = router;
