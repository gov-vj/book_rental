const BookCustomerIssuedAssociation = require('./bookCustomerIssuedAssociation');

const dbAssociation = () => {
  const create = () => {
    BookCustomerIssuedAssociation().create();
  };

  return {
    create,
  };
};

module.exports = dbAssociation;
