const Book = require('../models/Book');

const bookService = () => {
  const addBook = async (title, genre, price) => Book.create({
    title,
    genre,
    price,
  });

  const findBooks = async (title, genre) => {
    const query = {};
    if (title) {
      query.title = title;
    }

    if (genre) {
      query.genre = genre;
    }

    return Book.findAll({
      where: query,
    });
  };

  return {
    addBook,
    findBooks,
  };
};

module.exports = bookService;
