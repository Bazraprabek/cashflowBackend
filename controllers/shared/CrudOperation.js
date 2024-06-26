class CrudOperation {
  static async createEntity(req, res, model) {
    try {
      const createdModel = await model.create(req.body);
      res.status(201).json(createdModel);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllEntites(req, res, model) {
    try {
      const entites = await model.findAll();
      if (entites.length > 0) res.status(200).json(entites);
      else {
        res.status(404).json({ error: "No data has been added" });
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
        return res.status(404).json({ error: "Data was not found" });
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
        return res.status(404).json({ error: "Transaction not found" });
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
