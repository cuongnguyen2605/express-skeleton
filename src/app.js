const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const passport = require('passport');

const routes = require('./routes/v1');
const { errorHandler, errorConverter } = require('./middlewares');

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());

app.use(cors());
app.options('*', cors());

app.use(passport.initialize());

app.use('/v1', routes);

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
