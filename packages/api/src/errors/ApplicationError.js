class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

module.exports = ApplicationError;
