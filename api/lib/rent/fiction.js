const Rent = require('./rent');

const rate = 3;

class Fiction extends Rent {
  cal() {
    return rate * this.dueFor;
  }
}

module.exports = Fiction;
