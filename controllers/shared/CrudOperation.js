const AppError = require("../../middleware/AppError");
const { searchEntityMissingError } = require("../../utils/Const");

class CrudOperation {
  static async createEntity(req, res, next, model, cb) {
    const validation = await cb(req.body);
    if (validation) {
      const createdModel = await model.create(req.body);
      console.log("check", createdModel);
      res.status(201).json(createdModel);
    }
  }

  static async getAllEntites(req, res, next, model) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
      const entities = await model.findAndCountAll({
        offset,
        limit: parseInt(limit),
      });

      if (entities.rows.length > 0) {
        const totalPages = Math.ceil(entities.count / limit);
        res.status(200).json({
          entities: entities.rows,
          currentPage: parseInt(page),
          totalPages,
          totalEntities: entities.count,
        });
      } else {
        return next(new AppError("Data was not found", 404));
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEntityById(req, res, next, model) {
    const { id } = req.params;
    let entityResult = await model.findByPk(id);
    console.log(entityResult);
    if (!entityResult) {
      searchEntityMissingError(next);
    }
    res.json(entityResult);
  }

  static async updateEntity(req, res, next, model, cb) {
    const { id } = req.params;
    const updatedValue = req.body;
    let currentModel = await model.findByPk(id);
    console.log(currentModel);
    if (!currentModel) {
      searchEntityMissingError(next);
    }
    const updatedModel = cb(updatedValue, currentModel);
    console.log(updatedModel);
    await updatedModel.save();
    res.json(updatedModel);
  }

  static async deleteEntity(req, res, next, model) {
    const { id } = req.params;

    let entityResult = await model.findByPk(id);
    if (!entityResult) {
      searchEntityMissingError(next);
    }
    await entityResult.destroy();
    res.status(200).json({ id: id, msg: "Deleted Successfully" });
  }
}

module.exports = { CrudOperation };
