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
    console.log(`${err.stack}\t${err.name}`);
    new Logger().logEvents(
      `${req.method}\t${req.url}\t${req.headers.host}\t${err.stack}\t${err.message}\t${err.name}`,
      "error.log"
    );

    res.status(404).json({
      status: "error",
      message: err.message,
      stack: err.stack,
    });
  }
}

module.exports = Logger;
