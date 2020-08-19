const Rent = require('./rent');

const rate = 1.5;

class Regular extends Rent {
  cal() {
    if (this.dueFor <= 2) {
      return 2;
    }

    return 2 + (rate * (this.dueFor - 2));
  }
}

module.exports = Regular;
