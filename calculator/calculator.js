class App {
  constructor() {
    this.addListeners();
    this.inProgress = '';
    this.display = [];
  }

  renderDisplay() {
    let display = document.getElementById('display');
    display.textContent = this.display.join(' ');

    let inProgress = document.getElementById('inProgress');
    inProgress.textContent = this.inProgress || 0;
  }

  numberPress(btn) {
    this.inProgress += btn.getAttribute('id');
  }

  operatorPress(btn) {
    let operator = btn.getAttribute('id');
    this.display.push(Number(this.inProgress, 10));
    this.inProgress = '';
    this.display.push(operator);
  }

  calculateSum() {
    function isNumber(ele) {
      return !Number.isNaN(+ele);
    }

    let map = {
      '+': function(operand1, operand2) {
        return operand1 + operand2;
      },
      '-': function(operand1, operand2) {
        return operand1 - operand2;
      },
      '*': function(operand1, operand2) {
        return operand1 * operand2;
      },
      '/': function(operand1, operand2) {
        return operand1 / operand2;
      },
      '%': function(operand1, operand2) {
        return operand1 % operand2;
      },
    };

    let stack = null;
    let nextOperator = null;
    this.display.forEach(entry => {
      if (isNumber(entry) && stack === null) {
        stack = +entry;
      } else if (!isNumber(entry)) {
        nextOperator = entry;
      } else if (isNumber(entry)) {
        stack = map[nextOperator](stack, +entry);
      }
    });
    this.inProgress = stack;
    this.display = [];
  }

  addListeners() {
    document.getElementById('button-pad').addEventListener('click', ({target}) => {
      // console.log(target.getAttribute('id'));
      if (target.classList.contains('number')) {
        this.numberPress(target);
      } else if (target.classList.contains('operator')) {
        this.operatorPress(target);
      } else if (target.getAttribute('id') === 'clearEntry') {
        this.inProgress = '';
      } else if (target.getAttribute('id') === 'clearAll') {
        this.inProgress = '';
        this.display = [];
      } else if (target.getAttribute('id') === 'negate') {
        this.inProgress = -(this.inProgress);
      } else if (target.getAttribute('id') === '=') {
        this.display.push(this.inProgress);
        this.calculateSum();
      }
      this.renderDisplay();
    });
  }
}

document.addEventListener('DOMContentLoaded', event => {
  new App();
})