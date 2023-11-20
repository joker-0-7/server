class AppError extends Error {
  constructor() {
    super();
  }
  create(msg, statusCode, statusText) {
    this.msg = msg;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}
module.exports = new AppError();
