/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const { ValidationError } = require('sequelize');
const ClientError = require('./lib/error/clientError');

/**
 * server configuration
 */
const config = require('../config/index');
const dbService = require('./services/db.service');

// environment: development
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const mappedRoutes = mapRoutes(config.routes, 'api/controllers/');
const DB = dbService(environment, config.migrate).start();

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// fill routes for express application
app.use('/api', mappedRoutes);

// error handling
// eslint-disable-next-line
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof ValidationError) {
    res.status(400).json(err.errors[0].message);
    return;
  }

  if (err instanceof ClientError) {
    res.status(400).json(err.message);
    return;
  }

  res.status(500).json('Internal server error');
});

server.listen(config.port, () => {
  if (environment !== 'development') {
    console.error(`NODE_ENV is set to ${environment}, but only development is valid.`);
    process.exit(1);
  }
  return DB;
});
