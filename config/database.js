const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');

const database = new Sequelize(
  connection.database,
  connection.username,
  connection.password, {
    host: connection.host,
    dialect: connection.dialect,
    storage: path.join(process.cwd(), 'db', 'database.sqlite'),
    logging: connection.logging,
  },
);

module.exports = database;
