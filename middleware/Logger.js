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
    console.log("Hello");
    new Logger().logEvents(
      `${req.method}\t${req.url}\t${req.headers.host}\t${err.stack}\t${err.message}\t${err.name}`,
      "error.log"
    );

    if (process.env.ENVIRONMENT === "development") {
      console.log("From Dev");
      return developmentError(err, res);
    } else {
      console.log("From prod");

      return productionError(err, res);
    }
  }
}

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const productionError = (err, res) => {
  console.log("Prd error");
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = Logger;
