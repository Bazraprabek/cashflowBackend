const { searchEntityMissingError } = require("../../utils/Const");

class CrudOperation {
  static async createEntity(req, res, next, model, cb) {
    const validation = await cb(req.body);
    console.log(validation);
    if (validation) {
      const createdModel = await model.create(req.body);
      res.status(201).json(createdModel);
    }
  }

  static async getAllEntites(req, res, next, model) {
    const entites = await model.findAll();
    if (entites.length > 0) res.status(200).json({ entities: entites });
    else {
      searchEntityMissingError(next);
    }
  }

  static async getEntityById(req, res, next, model) {
    const { id } = req.params;
    let entityResult = await model.findByPk(id);
    if (!entityResult) {
      searchEntityMissingError(next);
    }
    res.json(entityResult);
  }

  static async updateEntity(req, res, next, model, cb) {
    const { id } = req.params;
    const updatedValue = req.body;
    let currentModel = await model.findByPk(id);
    if (!currentModel) {
      searchEntityMissingError(next);
    }
    const updatedModel = cb(updatedValue, currentModel);
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
