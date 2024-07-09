const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

class Logger {
  async logEvents(msg, fileName) {
    const folderPath = path.join(__dirname, "..", "logs");
    const time = new Date().toUTCString();
    const logItem = `${time}\t${msg}\n`;
    try {
      if (!fs.existsSync(folderPath)) {
        await fsPromises.mkdir(folderPath);
      }
      await fsPromises.appendFile(
        path.join(__dirname, "..", "logs", fileName),
        logItem
      );
    } catch (error) {
      console.log(error);
    }
  }

  static logger(req, res, next) {
    new Logger().logEvents(
      `${req.method}\t${req.url}\t${req.headers.origin}`,
      "reqLog.log"
    );
    next();
  }

  static errorLogger(err, req, res, next) {
    console.log("Global error handler");
    new Logger().logEvents(
      `${req.method}\t${req.url}\t${req.headers.host}\t${err.stack}\t${err.message}\t${err.name}`,
      "error.log"
    );

    if (process.env.ENVIRONMENT === "development") {
      return developmentError(err, req, res);
    } else {
      return productionError(err, res);
    }
  }
}

const developmentError = (err, req, res) => {
  console.log(res.name);
  console.log("Devs Error  :::  ");
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message || "Something went wrong!";

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors[0].message;
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = err.errors[0].message;
  }

  if (err.name === "SequelizeDatabaseError") {
    statusCode = 400;
    message = err.errors[0].message;
  }

  return res.status(statusCode).json({
    status: status,
    message: message,
    stack: err.stack,
    error: err,
  });
};

const productionError = (err, res) => {
  console.log("Prod error :::");
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Something went wrong!";
  return res.status(statusCode).json({
    status: status,
    message: message,
  });
};

module.exports = Logger;
