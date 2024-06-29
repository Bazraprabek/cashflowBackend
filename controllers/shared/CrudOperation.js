const AppError = require("../../middleware/AppError");

class CrudOperation {
  static async createEntity(req, res, next, model, cb) {
    const validation = await cb(req.body);
    if (validation) {
      const createdModel = await model.create(req.body);
      res.status(201).json(createdModel);
    }
  }

  static async getAllEntites(req, res, next, model) {
    try {
      const entites = await model.findAll();
      if (entites.length > 0) res.status(200).json({ entities: entites });
      else {
        return next(new AppError("Data was not found", 404));
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEntityById(req, res, next, model) {
    const { id } = req.params;
    let entityResult = await model.findByPk(id);
    if (!entityResult) {
      return next(new AppError("Data was not found", 400));
    }
    res.json(entityResult);
  }

  static async updateEntity(req, res, next, model, cb) {
    const { id } = req.params;
    const updatedValue = req.body;
    let currentModel = await model.findByPk(id);
    if (!currentModel) {
      return next(new AppError("Entity couldn't be found", 404));
    }
    const updatedModel = cb(updatedValue, currentModel);
    await updatedModel.save();
    res.json(updatedModel);
  }

  static async deleteEntity(req, res, next, model) {
    const { id } = req.params;

    let entityResult = await model.findByPk(id);
    if (!entityResult) {
      return next(new AppError("Entity was not found", 404));
    }
    await entityResult.destroy();
    res.status(200).json({ id: id, msg: "Deleted Successfully" });
  }
}

module.exports = { CrudOperation };
