require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const db = require("./config/db");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { logger, errorLogger } = require("./middleware/Logger");
const CatchAsync = require("./middleware/CatchAsync");

const { startServer } = require("./config/ServerStarter");
const ApiRoutes = require("./config/ApiRoutes");
const AppError = require("./middleware/AppError");
const app = express();

// app.use(logger);
// app.use(
//   "*",
//   CatchAsync(async (req, res, next) => {
//     throw next(new AppError("Path is missing", 202));
//   })
// );

app.use(errorLogger);
app.use(cors());
app.use(express.json());

new ApiRoutes(fs, path, app);

startServer(app, db);
