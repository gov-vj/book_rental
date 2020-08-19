const ClientError = require('../lib/error/clientError');

// eslint-disable-next-line no-unused-vars
const validateInputForCalculatingRent = (req, res, next) => {
  const { bid, due } = req.body;

  if (!bid) {
    throw new ClientError('Book id is empty');
  } else if (!Number.isInteger(+bid)) {
    throw new ClientError('Book id is not an integer');
  } else if (!due) {
    throw new ClientError('Due is empty');
  } else if (!Number.isInteger(+due)) {
    throw new ClientError('Due is not an integer');
  }

  next();
};

module.exports = validateInputForCalculatingRent;
