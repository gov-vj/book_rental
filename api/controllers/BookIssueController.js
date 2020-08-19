const bookIssueService = require('../services/bookIssue.service')();
const calculateRentService = require('../services/calculateRent.service')();

const BookIssueController = () => {
  const issue = async (req, res, next) => {
    try {
      const { bid, cid, due } = req.body;
      const rent = await calculateRentService.cal(bid, due);
      const bookIssued = await bookIssueService.issueBook(bid, cid, rent, due);
      res.json(bookIssued);
    } catch (err) {
      next(err);
    }
  };

  const returnBook = async (req, res, next) => {
    try {
      const issuedBook = await bookIssueService.returnBook(req.params.id);
      res.json(issuedBook);
    } catch (err) {
      next(err);
    }
  };

  const get = async (req, res, next) => {
    try {
      const { bid, cid, isReturned } = req.query;
      const booksIssued = await bookIssueService.findIssuedBook(bid, cid, isReturned);
      res.json(booksIssued);
    } catch (err) {
      next(err);
    }
  };

  const getAll = async (req, res, next) => {
    try {
      const booksIssued = await bookIssueService.findIssuedBook();
      res.json(booksIssued);
    } catch (err) {
      next(err);
    }
  };

  return {
    issue,
    returnBook,
    get,
    getAll,
  };
};

module.exports = BookIssueController;
