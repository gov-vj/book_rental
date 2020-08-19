const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');

const database = new Sequelize(
  connection.database,
  connection.username,
  connection.password, {
    host: connection.host,
    dialect: connection.dialect,
    pool: {
      max: 15,
      min: 0,
      idle: 10000,
    },
    storage: path.join(process.cwd(), 'db', 'database.sqlite'),
    logging: connection.logging,
  },
);

module.exports = database;
