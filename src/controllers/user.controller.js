const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { userService } = require('../services');

const create = async (req, res, next) => {
  try {
    const data = await userService.insert(req.body);

    res.status(StatusCodes.CREATED).json({
      statusCode: StatusCodes.CREATED,
      message: ReasonPhrases.CREATED,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const data = await userService.find(req.query);

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: ReasonPhrases.OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await userService.findById(id);

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: ReasonPhrases.OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const data = await userService.updateById({ _id: id }, payload);

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: ReasonPhrases.OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await userService.deleteById(id);

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: ReasonPhrases.OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { find, findOne, create, update, remove };
