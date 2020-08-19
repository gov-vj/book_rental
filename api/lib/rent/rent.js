/* eslint-disable class-methods-use-this */
class Rent {
  constructor(dueFor) {
    this.dueFor = dueFor;
    if (this.constructor === Rent) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  cal() {
    throw new Error("Method 'cal()' must be implemented.");
  }
}

module.exports = Rent;
