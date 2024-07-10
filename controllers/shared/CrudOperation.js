const { where } = require("sequelize");
const AppError = require("../../middleware/AppError");
const { searchEntityMissingError } = require("../../utils/Const");

class CrudOperation {
  static async createEntity(req, res, next, model, cb) {
    const validation = await cb(req.body);
    if (validation) {
      const createdModel = await model.create(req.body);
      console.log("entity has been created");
      res.status(201).json(createdModel);
    }
  }

  static async getAllEntites(req, res, next, model, userVerify) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    let where = {};
    if (userVerify) {
      const userId = req.userId;
      where = { userId };
    }

    try {
      const entities = await model.findAndCountAll({
        where,
        offset,
        limit: parseInt(limit),
      });

      if (entities.rows.length > 0) {
        const totalPages = Math.ceil(entities.count / limit);
        console.log("entity has been fetched");
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

  static async getAllEntityWithCustomIdInLimit(
    req,
    res,
    next,
    model,
    where,
    include
  ) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    try {
      const entities = await model.findAndCountAll({
        where,
        include,
        offset,
        limit: parseInt(limit),
      });

      if (entities.rows.length > 0) {
        const totalPages = Math.ceil(entities.count / limit);
        console.log(entities.rows);
        console.log("entity has been fetched");
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

  static async getAllEntityExcluding(req, res, next, model) {
    let entityResult = await model.findAll({
      attributes: {
        exclude: ["password", "role"],
      },
    });
    if (entityResult) {
      res.status(200).send(entityResult);
      console.log("entity has been fetched");
    } else {
      return searchEntityMissingError(next);
    }
  }

  static async getAllOwnEntity(req, res, next, model) {
    console.log(req.userId);
    let entityResult = await model.findAll({
      where: {
        userId: req.userId,
      },
    });
    console.log(entityResult);
    if (!entityResult) {
      return searchEntityMissingError(next);
    }
    if (entityResult) {
      res.status(200).send(entityResult);
      console.log("entity has been fetched");
    }
  }

  static async getEntityById(req, res, next, model) {
    const { id } = req.params;
    let entityResult = await model.findByPk(id);
    console.log(entityResult);
    if (!entityResult) {
      return searchEntityMissingError(next);
    }
    if (entityResult) {
      res.json(entityResult);
      console.log("entity has been sent");
    }
  }

  static async updateEntity(req, res, next, model, cb) {
    const { id } = req.params;
    const updatedValue = req.body;
    let currentModel = await model.findByPk(id);

    if (!currentModel) {
      return next(new AppError("Entity not found", 404));
    }

    const updatedModel = await await cb(updatedValue, currentModel);

    if (updatedModel) {
      if (updatedModel) {
        await updatedModel.save();
        res.status(200).json(updatedModel);
        console.log("Entity has been updated");
      } else {
        return next(new AppError("Failed to update entity", 400));
      }
    }
  }

  static async deleteEntity(req, res, next, model) {
    const { id } = req.params;
    let entityResult = await model.findByPk(id);
    console.log(entityResult);
    if (!entityResult) {
      return searchEntityMissingError(next);
    }
    if (entityResult) {
      await entityResult.destroy();
      console.log("entity has been deleted");

      res.status(200).json({ id: id, msg: "Deleted Successfully" });
    }
  }
}

module.exports = { CrudOperation };
