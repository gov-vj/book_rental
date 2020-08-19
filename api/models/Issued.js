const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Issued = sequelize.define('Issued', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  due_for: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
    },
  },
  rent: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  advanced: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  isReturned: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  BookId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Books',
      key: 'id',
    },
  },
  CustomerId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Customers',
      key: 'id',
    },
  },

}, {
  updatedAt: false,
  tableName: 'Issued',
});

// eslint-disable-next-line
Issued.prototype.toJSON = function () {
  return ({ ...this.get() });
};

module.exports = Issued;
