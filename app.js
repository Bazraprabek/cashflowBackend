require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const db = require("./config/db");
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
      // console.log(url);
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to CashFlow server!</h1>");
});

const port = process.env.PORT || 3334;
const startServer = async () => {
  try {
    await db.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await db.sync({ alter: true });
    console.log("Database synced successfully.");

    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
