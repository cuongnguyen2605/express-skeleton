const express = require('express');

const { authRequired } = require('../../middlewares');
const { userController } = require('../../controllers');

const router = express.Router();

router
  .post('/', authRequired, userController.create)
  .get('/', authRequired, userController.find)
  .get('/:id', authRequired, userController.findOne)
  .put('/:id', authRequired, userController.update)
  .delete('/:id', authRequired, userController.remove);

module.exports = router;
