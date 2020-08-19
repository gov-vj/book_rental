const Sequelize = require('sequelize');

const GENRE = require('../constants/genre');
const sequelize = require('../../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genre: {
    type: Sequelize.STRING,
    defaultValue: GENRE.REGULAR,
  },
  price: {
    type: Sequelize.FLOAT,
    validate: {
      isDecimal: true,
    },
  },
}, {
  timestamps: false,
});

// eslint-disable-next-line
Book.prototype.toJSON = function () {
  return ({ ...this.get() });
};

module.exports = Book;
