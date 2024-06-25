const express = require("express");
require("dotenv").config();
const sequelize = require("./config/db");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

fs.readdir(path.join(__dirname, "routes"), (err, files) => {
  files.forEach((f, i) => {
    if (f.includes(".route.js")) {
      let name = f.replace(".route.js", "");
      let url = "/api/" + name;
      app.use(url, require("./routes/" + f));
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully.");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
