const { CrudOperation } = require("./shared/CrudOperation");
const Asset = require("../models/Asset");
const AppError = require("../middleware/AppError");

exports.createAsset = (req, res, next) => {
  CrudOperation.createEntity(req, res, next, Asset, async (data) => {
    if (!data.name || !data.value) {
      throw new AppError("Name and value are required", 400);
    }
    return true;
  });
};

exports.getAllAssets = (req, res, next) => {
  CrudOperation.getAllEntites(req, res, next, Asset);
};

exports.getAssetById = (req, res, next) => {
  CrudOperation.getEntityById(req, res, next, Asset, {
    where: { id: req.params.id, userId: req.user.id },
  });
};

exports.updateAsset = (req, res, next) => {
  CrudOperation.updateEntity(
    req,
    res,
    next,
    Asset,
    (updatedValue, currentModel) => {
      currentModel.name = updatedValue.name || currentModel.name;
      currentModel.value = updatedValue.value || currentModel.value;
      return currentModel;
    }
  );
};

exports.deleteAsset = (req, res, next) => {
  CrudOperation.deleteEntity(req, res, next, Asset);
};
