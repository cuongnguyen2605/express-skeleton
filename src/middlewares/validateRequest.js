const { StatusCodes } = require('http-status-codes');

module.exports = (schema, property) => async (req, res, next) => {
  try {
    await schema.validateAsync(req[property]);
    return next();
  } catch (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    return res.status(StatusCodes.BAD_REQUEST).json({ error: message });
  }
};
