const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

const ApiError = require('../utils/ApiError');
const tokenService = require('./token.service');
const { MESSAGE } = require('../consts');
const { redis } = require('../libs');
const { AuthModel, UserModel } = require('../models');

const signUp = async (payload) => {
  const { username, password, firstName, lastName } = payload;

  const existed = await AuthModel.countDocuments({ username });
  if (existed)
    throw new ApiError(StatusCodes.CONFLICT, MESSAGE.USERNAME_EXISTED);

  const userId = new mongoose.Types.ObjectId();

  const userDoc = new UserModel({
    _id: userId,
    firstName,
    lastName,
  });

  const authDoc = new AuthModel({
    username,
    password,
    user: userId,
  });

  return Promise.all([userDoc.save(), authDoc.save()]);
};

const signIn = async (payload) => {
  const { username, password } = payload;

  const auth = await AuthModel.findOne({ username });
  if (!auth || !(await auth.isPasswordMatch(password)))
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      MESSAGE.INCORRECT_USERNAME_OR_PASSWORD
    );

  return tokenService.generateAuthTokens(auth.user);
};

const signOut = (payload) => redis.get(payload.refreshToken);

module.exports = {
  signUp,
  signIn,
  signOut,
};
