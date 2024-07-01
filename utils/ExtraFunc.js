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

const developmentError = (err, res) => {
  console.log("From dev error");
  if (err.code === "ERR_UNHANDLED_REJECTION") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }

  if (err instanceof UniqueConstraintError) {
    // Custom handling for unique constraint errors
    const errors = err.errors.map((e) => e.message);
    res.status(400).json({
      status: "error",
      message: "Unique constraint error",
      errors,
    });
  } else if (err instanceof ValidationError) {
    // Custom handling for validation errors
    const errors = err.errors.map((e) => e.message);
    res.status(400).json({
      status: "error",
      message: "Validation error",
      errors,
    });
  } else {
    // General error handling
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }

  if (err.code === "SequelizeValidationError") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message || "Validation error";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired. Please log in again.";
  }
  if (err.name === "JsonWebTokenError") {
    res.status(err.statusCode).json({
      statusCode: 401,
      message: "Invalid token. Please log in again.",
    });
  }
  if (err.name === "NotBeforeError") {
    statusCode = 401;
    message = "Token not active. Please check your token validity.";
  }

  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    status: status,
    message: message,
    // stack: err.stack,
  });
};
