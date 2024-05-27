const Joi = require('joi');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const { MESSAGE } = require('../consts');

module.exports = async (e, req, res, next) => {
  if (e.uncaughtError instanceof Joi.ValidationError) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  const isCatchError = Object.values(MESSAGE).includes(e.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: e.statusCode ? e.statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
    message: isCatchError ? e.message : ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};
