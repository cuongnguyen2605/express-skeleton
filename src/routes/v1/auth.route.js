const express = require('express');

const {
  rateLimiter,
  authRequired,
  validateRequest,
} = require('../../middlewares');
const { authValidation } = require('../../validations');
const { authController } = require('../../controllers');

const router = express.Router();

router
  .post(
    '/sign-up',
    rateLimiter,
    validateRequest(authValidation.signUp, 'body'),
    authController.signUp
  )
  .post(
    '/sign-in',
    rateLimiter,
    validateRequest(authValidation.signIn, 'body'),
    authController.signIn
  )
  .post('/sign-out', authRequired, authController.signOut);

module.exports = router;
