const Book = require('../models/Book');
const RentFactory = require('../factory/rent');
const ClientError = require('../lib/error/clientError');

const calculateRent = () => {
  const cal = async (bookId, due) => {
    const book = await Book.findByPk(bookId);
    if (!book) {
      throw new ClientError('Book does not exist');
    }

    return RentFactory().createRentObject(book.genre, due).cal();
  };

  return {
    cal,
  };
};

module.exports = calculateRent;
