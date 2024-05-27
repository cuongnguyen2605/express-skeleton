const { StatusCodes } = require('http-status-codes');

const ApiError = require('../utils/ApiError');
const { MESSAGE } = require('../consts');
const { UserModel, AuthModel } = require('../models');

const count = (filter) => UserModel.countDocuments(filter).exec();

const insert = (payload) => {
  const userDoc = new UserModel({ ...payload });
  return userDoc.save();
};

const find = (filter, options) => UserModel.find(filter, options).lean().exec();

const findById = (id) => UserModel.findById(id).lean().exec();

const updateById = async (id, payload) => {
  const isExisted = await count({ _id: id });
  if (!isExisted)
    throw new ApiError(StatusCodes.NOT_FOUND, MESSAGE.USER_NOT_FOUND);

  if (payload.username) {
    const isExisted = await count({ username: payload.username });
    if (isExisted)
      throw new ApiError(StatusCodes.BAD_REQUEST, MESSAGE.USERNAME_EXISTED);
  }

  return UserModel.findOneAndUpdate({ _id: id }, payload, { new: true })
    .lean()
    .exec();
};

const deleteById = async (id) => {
  const isExisted = await count({ _id: id });
  if (!isExisted)
    throw new ApiError(StatusCodes.NOT_FOUND, MESSAGE.USER_NOT_FOUND);

  await AuthModel.deleteOne({ userId: id }).exec();

  return UserModel.findByIdAndDelete(id).lean().exec();
};

module.exports = {
  insert,
  find,
  findById,
  updateById,
  deleteById,
};
