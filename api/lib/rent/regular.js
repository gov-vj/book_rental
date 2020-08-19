const Rent = require('./rent');

const rate = 1.5;

class Regular extends Rent {
  cal() {
    return rate * this.dueFor;
  }
}

module.exports = Regular;
