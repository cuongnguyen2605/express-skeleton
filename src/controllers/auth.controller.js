const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const { authService } = require('../services');

const signUp = async (req, res, next) => {
  try {
    const response = await authService.signUp(req.body);

    res.status(StatusCodes.CREATED).json({
      statusCode: StatusCodes.CREATED,
      message: ReasonPhrases.CREATED,
      data: response[0],
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const response = await authService.signIn(req.body);

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: ReasonPhrases.OK,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    const response = await authService.signOut(req.body);

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: ReasonPhrases.OK,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
