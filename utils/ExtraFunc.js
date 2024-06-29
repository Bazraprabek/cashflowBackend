const createEntity = (cb, model) => {
  console.log("into Created");
  async (req, res, next) => {
    const validation = await cb(req.body);
    console.log(validation);
    if (validation) {
      const createdModel = await model.create(req.body);
      res.status(201).json(createdModel);
    } else {
      throw new AppError("Required Field must be there", 404);
    }
  };
};

const validateData = CatchAsync(async (body) => {
  let mainValidation = false;
  console.log(body);
  if (body.name) {
    const dbResult = await walletModel.findOne({
      where: { name: body.name },
    });
    if (dbResult) {
      throw new AppError(
        `The entity with given name "${body.name}" has already been registerd. Try Something new`,
        404
      );
    } else {
      console.log("Result not found");
      mainValidation = true;
      return mainValidation;
    }
  } else {
    throw new AppError("please provide the required field", 500);
  }
});

// app.use(logger);
// app.use;
// "*",
//   CatchAsync(async (req, res, next) => {
//     throw new AppError("Path is missing", 202);
//   })();

const create_Model = CatchAsync(async (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  const newEntry = {
    name: name,
  };

  if (!name) {
    throw new AppError("User name is required !!!", 400);
  }
  if (name) {
    const dbResult = await walletModel.findOne({
      where: { name: name },
    });
    if (dbResult) {
      throw new AppError(
        `The entity with given name "${name}" has already been registerd. Try Something new`,
        404
      );
    } else {
      const createModel = await walletModel.create(req.body);
      res.status(202).json({ newModel: createModel });
    }
  }
});
