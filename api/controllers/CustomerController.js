const { addCustomer, findCustomers } = require('../services/customer.service')();

const CustomerController = () => {
  const insert = async (req, res, next) => {
    try {
      const { name, mobile } = req.body;
      const customer = await addCustomer(name, mobile);
      res.json(customer);
    } catch (err) {
      next(err);
    }
  };

  const get = async (req, res, next) => {
    try {
      const { name, mobile } = req.query;
      const customers = await findCustomers(name, mobile);
      res.json(customers);
    } catch (err) {
      next(err);
    }
  };

  const getAll = async (req, res, next) => {
    try {
      const customers = await findCustomers();
      res.json(customers);
    } catch (err) {
      next(err);
    }
  };

  return {
    insert,
    get,
    getAll,
  };
};

module.exports = CustomerController;
