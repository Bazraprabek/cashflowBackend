require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const db = require("./config/db");
const fs = require("fs");
const path = require("path");
const { startServer } = require("./config/ServerStarter");
const ApiRoutes = require("./config/ApiRoutes");

const app = express();

app.use(express.json());

new ApiRoutes(fs, path, app);

startServer(app, db);
