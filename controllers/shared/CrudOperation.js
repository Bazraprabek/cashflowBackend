const AppError = require("../../middleware/AppError");
const CatchAsync = require("../../middleware/CatchAsync");

class CrudOperation {
  static async createEntity(req, res, model, next, cb) {
    // console.log(req.body);
    const validation = await cb(req.body);

    if (validation) {
      const createdModel = await model.create(req.body);
      res.status(201).json(createdModel);
    } else {
      // return next(new AppError("Please provide the required field", 400));
      return next(new AppError("Please provide the required field", 400));
    }
  }

  static async getAllEntites(req, res, model) {
    try {
      const entites = await model.findAll();
      if (entites.length > 0) res.status(200).json({ entities: entites });
      else {
        return new AppError("Data was not found", 404);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEntityById(req, res, model) {
    const { id } = req.params;
    try {
      let entityResult = await model.findByPk(id);
      if (!entityResult) {
        return new AppError("Data was not found", 400);
      }
      res.json(entityResult);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateEntity(req, res, model, cb) {
    const { id } = req.params;
    const updatedValue = req.body;
    try {
      let currentModel = await model.findByPk(id);
      if (!currentModel) {
        return new AppError("Entity couldn't be found", 404);
      }
      const updatedModel = cb(updatedValue, currentModel);
      await updatedModel.save();
      res.json(updatedModel);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  static async deleteEntity(req, res, model) {
    const { id } = req.params;
    try {
      let entityResult = await model.findByPk(id);
      if (!entityResult) {
        return res.status(204).json({ error: "Data was not found" });
      }
      await entityResult.destroy();
      res.status(200).json({ id: id, msg: "Deleted Successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CrudOperation;
