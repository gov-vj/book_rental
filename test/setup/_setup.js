const bodyParser = require('body-parser');
const express = require('express');
const mapRoutes = require('express-routes-mapper');
const { ValidationError } = require('sequelize');

const config = require('../../config/index');
const database = require('../../config/database');

const beforeAction = async () => {
  const testapp = express();
  const mappedRoutes = mapRoutes(config.routes, 'api/controllers/');

  testapp.use(bodyParser.urlencoded({ extended: false }));
  testapp.use(bodyParser.json());

  testapp.use('/api', mappedRoutes);
  // eslint-disable-next-line
  testapp.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      res.status(400).json(err.errors[0].message);
      return;
    }

    res.status(500).json('Internal server error');
  });

  await database.authenticate();
  await database.sync().then(() => console.log('Connection to the database has been established successfully'));

  return testapp;
};

const afterAction = async () => {
  await database.close();
};

module.exports = { beforeAction, afterAction };
