class HttpError extends Error {
  constructor(message, code) {
    super(message); // Add native error with a message
    this.code = code; // Adding a http code also
  }
}

module.exports = HttpError;
