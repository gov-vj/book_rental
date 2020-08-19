const validateInputForCalculatingRent = require('../../api/middleware/validateInputForCalculatingRent');

const routes = {
  'POST /book/add': 'BookController.insert',
  'GET /book/get': 'BookController.get',
  'GET /book/getAll': 'BookController.getAll',
  'POST /customer/add': 'CustomerController.insert',
  'GET /customer/get': 'CustomerController.get',
  'GET /customer/getAll': 'CustomerController.getAll',
  'PUT /issue/return/:id': 'BookIssueController.returnBook',
  'POST /issue/calCharges': {
    path: 'BookIssueController.issue',
    middlewares: [validateInputForCalculatingRent],
  },
  'GET /issue/get': 'BookIssueController.get',
  'GET /issue/getAll': 'BookIssueController.getAll',
};

module.exports = routes;
