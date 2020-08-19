const BookIssued = require('../models/Issued');

const bookIssueService = () => {
  const issueBook = async (BookId, CustomerId, rent, dueFor) => BookIssued.create({
    BookId,
    CustomerId,
    rent,
    due_for: dueFor,
  });

  const returnBook = async (id) => BookIssued.update({ isReturned: true }, { where: { id } });

  const findIssuedBook = async (BookId, CustomerId, isReturned) => {
    const query = {};
    if (BookId) {
      query.BookId = BookId;
    }

    if (CustomerId) {
      query.CustomerId = CustomerId;
    }

    if (isReturned) {
      query.isReturned = isReturned;
    }

    return BookIssued.findAll({
      where: query,
    });
  };

  return {
    issueBook,
    returnBook,
    findIssuedBook,
  };
};

module.exports = bookIssueService;
