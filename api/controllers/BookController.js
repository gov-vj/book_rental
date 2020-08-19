const { addBook, findBooks } = require('../services/book.service')();

const BookController = () => {
  const insert = async (req, res, next) => {
    try {
      const { title, genre, price } = req.body;
      const book = await addBook(title, genre, price);
      res.json(book);
    } catch (err) {
      next(err);
    }
  };

  const get = async (req, res, next) => {
    try {
      const { title, genre } = req.query;
      const books = await findBooks(title, genre);
      res.json(books);
    } catch (err) {
      next(err);
    }
  };

  const getAll = async (req, res, next) => {
    try {
      const books = await findBooks();
      res.json(books);
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

module.exports = BookController;
