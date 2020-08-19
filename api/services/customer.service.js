const Customer = require('../models/Customer');

const bookService = () => {
  const addCustomer = async (name, mobile) => Customer.create({
    name,
    mobile,
  });

  const findCustomers = async (name, mobile) => {
    const query = {};
    if (name) {
      query.name = name;
    }

    if (mobile) {
      query.mobile = mobile;
    }

    return Customer.findAll({
      where: query,
    });
  };

  return {
    addCustomer,
    findCustomers,
  };
};

module.exports = bookService;
