const mongoose = require('mongoose');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const ApiError = require('../utils/ApiError');

module.exports = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || ReasonPhrases[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};
