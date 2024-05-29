const jwt = require('jsonwebtoken');
const moment = require('moment');

const ApiError = require('../utils/ApiError');
const { TOKEN, MESSAGE } = require('../consts');
const { redis } = require('../libs');

const saveToken = (token, expires) => redis.setEx(token, token, expires);

const generateToken = (userId, expires, type, secret = process.env.SECRET) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (userId) => {
  const accessTokenExpires = moment().add(1, 'days');
  const accessToken = generateToken(
    userId,
    accessTokenExpires,
    TOKEN.ACCESS_TOKEN
  );

  const refreshTokenExpires = moment().add(7, 'days');
  const refreshToken = generateToken(
    userId,
    refreshTokenExpires,
    TOKEN.REFRESH_TOKEN
  );

  await saveToken(refreshToken, 604800); // 7 days

  return {
    accessToken,
    refreshToken,
  };
};

const verifyToken = async (token) => {
  const payload = jwt.verify(token, process.env.SECRET);

  const tokenDoc = await redis.get(token);
  if (!tokenDoc) {
    throw new ApiError(MESSAGE.TOKEN_NOT_FOUND);
  }

  return payload;
};

module.exports = {
  generateAuthTokens,
  verifyToken,
};
