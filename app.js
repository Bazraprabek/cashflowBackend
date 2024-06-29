require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const db = require("./config/db");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { logger, errorLogger } = require("./middleware/Logger");
const { startServer } = require("./config/ServerStarter");
const ApiRoutes = require("./config/ApiRoutes");
const app = express();

// app.use(logger);

app.use(cors());
app.use(express.json());

new ApiRoutes(fs, path, app);

app.use(errorLogger);
startServer(app, db);
