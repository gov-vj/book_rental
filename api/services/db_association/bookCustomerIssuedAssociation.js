const Book = require('../../models/Book');
const Issued = require('../../models/Issued');
const Customer = require('../../models/Customer');

const bookCustomerIssuedAssociation = () => {
  const create = () => {
    Book.belongsToMany(Customer, {
      through: { model: Issued, unique: false },
    });
    Customer.belongsToMany(Book, {
      through: { model: Issued, unique: false },
    });
  };

  return {
    create,
  };
};

module.exports = bookCustomerIssuedAssociation;
