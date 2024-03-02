'use strict';

class Telephone {
  constructor() {
    this.numbers = new Set();
    this.observers = [];
    this.inputValue = '';

    this.modal = document.querySelector('.modal');
    this.outPut = document.querySelector('.text');
    this.icon = document.querySelector('.icon');

    this.addBtn = document.querySelector('.add');
    this.dialBtn = document.querySelector('.dialing');
    this.delBtn = document.querySelector('.delete');
    this.info = document.querySelector('.small');
    this.input = document.getElementById('input');

    this.icon.addEventListener('click', () => this.toggleModal());

    this.input.addEventListener('focus', () => {
      if (this.modal.classList.contains('show-modal')) {
        this.input.disabled = true;
        this.info.style.display = 'flex';
        this.addBtn.disabled = true;
      }
    });

    this.addBtn.addEventListener('click', () => {
      this.inputValue = this.input.value;
      if (this.inputValue.trim() === '') {
        this.info.style.display = 'flex';
        return (this.info.textContent =
          'Please input phone number you want to Add');
      }
      this.addPhoneNumber(this.inputValue);
      this.toggleModal();
      this.input.value = '';
      console.log(this.input);
    });

    this.delBtn.addEventListener('click', () => {
      this.inputValue = this.input.value;
      if (this.inputValue === '') {
        this.info.style.display = 'flex';
        return (this.info.textContent =
          'Please input phone number you want to Delete');
      }
      this.removePhoneNumber(this.inputValue);
      this.toggleModal();
      this.input.value = '';
    });

    this.dialBtn.addEventListener('click', () => {
      this.inputValue = this.input.value;
      if (this.inputValue === '') {
        this.info.style.display = 'flex';
        return (this.info.textContent =
          'Please input phone number you want to dial');
      }
    });
  }

  addPhoneNumber(num) {
    const phoneNumber = parseInt(num);
    this.numbers.add(phoneNumber);
    this.outPut.textContent = `${num} have been added to phone book`;
    console.log(this.numbers);
  }

  removePhoneNumber(num) {
    const phoneNumber = parseInt(num);
    if (!this.numbers.has(phoneNumber))
      return (this.outPut.textContent = `${phoneNumber} is not saved on the telephone book`);

    this.numbers.delete(phoneNumber);
    this.outPut.textContent = 'Phone number successfully deleted';
    console.log(this.numbers);
  }

  dialPhoneNumber(num) {
    const phoneNumber = parseInt(num);
    if (!this.numbers.has(phoneNumber)) {
      this.info.style.display = 'flex';
      return (this.info.textContent = `Dialed number (${phoneNumber}) is not included in your phone book`);
    }
    this.notifyObserver(phoneNumber);
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

  toggleModal() {
    this.modal.classList.toggle('show-modal');
    this.info.style.display = 'none';
    this.input.disabled = false;
    this.addBtn.disabled = false;
  }
}

class DialedNumberObserver {
  notify(num) {
    console.log(`This number dialed is ${num}`);
  }
}

class DialingNumberObserver {
  notify(num) {
    console.log(`Dialing ${num}....`);
  }
}

const telephone = new Telephone();
const dialingNumber = new DialingNumberObserver();
const dialedNumber = new DialedNumberObserver();

telephone.addObserver(dialedNumber);
telephone.addObserver(dialingNumber);

// telephone.addPhoneNumber('07033881174');
// telephone.addPhoneNumber('08163115022');
