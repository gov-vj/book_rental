const Rent = require('./rent');

const rate = 1.5;

class Novel extends Rent {
  cal() {
    if (this.dueFor < 3) {
      return 4.5;
    }

    return rate * this.dueFor;
  }
}

module.exports = Novel;
