const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Customer = sequelize.define('Customer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  mobile: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[7-9][0-9]{9}$/i,
    },
  },
}, {
  timestamps: false,
});

// eslint-disable-next-line
Customer.prototype.toJSON = function () {
  return ({ ...this.get() });
};

module.exports = Customer;
