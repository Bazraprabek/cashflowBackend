class CatchAsync {
  static errorHandler(fn) {
    const catchError = (req, res, next) => {
      fn(req, res, next).catch(next);
    };
    return catchError;
  }
}

module.exports = CatchAsync;
