const Joi = require('joi');

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      'password must contain at least 1 letter and 1 number'
    );
  }
  return value;
};

const signUp = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().custom(password),
  firstName: Joi.string().required(),
});

const signIn = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().custom(password),
});

module.exports = {
  signUp,
  signIn,
};
