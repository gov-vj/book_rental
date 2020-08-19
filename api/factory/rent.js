const Novel = require('../lib/rent/novel');
const GENRE = require('../constants/genre');
const Fiction = require('../lib/rent/fiction');
const Regular = require('../lib/rent/regular');
const ClientError = require('../lib/error/clientError');

const RentFactory = () => {
  const createRentObject = (genre, due) => {
    switch (genre) {
      case GENRE.FICTION:
        return new Fiction(due);
      case GENRE.NOVEL:
        return new Novel(due);
      case GENRE.REGULAR:
        return new Regular(due);
      default:
        throw new ClientError(`Rent object is not created. Invalid genre type. [genre=${genre}]`);
    }
  };

  return {
    createRentObject,
  };
};

module.exports = RentFactory;
