'use strict';

class Telephone {
  constructor() {
    this.numbers = new Set();
    this.observers = [];
  }

  addPhoneNumber(num) {
    this.numbers.add(num);
  }

  removePhoneNumber(num) {
    this.numbers.delete(num);
  }

  dialPhoneNumber(num) {
    this.notifyObserver(num);
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObserver(num) {
    this.observers.forEach((obs) => obs.notify(num));
  }
}

class DialedNumberObserver {
  notify(num) {
    console.log(`This number dialed is ${num}`);
  }
}

class DialingNumberObserver {
  notify(num) {
    console.log(`Dialing ${num}`);
  }
}

const telephone = new Telephone();
const dialingNumber = new DialingNumberObserver();
const dialedNumber = new DialedNumberObserver();

telephone.addObserver(dialedNumber);
telephone.addObserver(dialingNumber);

telephone.addPhoneNumber('07033881174');
telephone.addPhoneNumber('08163115022');
