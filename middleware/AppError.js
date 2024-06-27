class AppError extends Error {
  constructor(msg, statscode) {
    super(msg);
    this.statusCode = statscode;
    this.status = `${statscode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
