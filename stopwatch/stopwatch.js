class App {
  constructor() {
    this.startTime = new Date();
    this.running = false;
    this.elapsedTime = 0;
    this.addListeners();
    this.handler;
    this.stopwatchTemplate = Handlebars.compile(document.getElementById('stopwatch-template').innerHTML)
    this.initializeDisplay();
  }

  initializeDisplay() {
    let obj = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      centiseconds: '00',
    };
    this.renderDisplay(obj);
  }

  renderDisplay(obj) {
    let stopwatch = document.getElementById('stopwatch');
    if (stopwatch) stopwatch.remove();
    document.getElementById('buttons').insertAdjacentHTML('beforebegin', this.stopwatchTemplate(obj));
  }

  renderTime(date) {
    let milliseconds = this.elapsedTime + Number(date - this.startTime, 10);
    let hours = (Math.floor(milliseconds / 3600000) % 24).toString().padStart(2, '0');
    let minutes = (Math.floor(milliseconds / 60000) % 60).toString().padStart(2, '0');
    let seconds = (Math.floor(milliseconds / 1000) % 60).toString().padStart(2, '0');
    let centiseconds = (Math.floor(milliseconds / 10) & 100).toString().padStart(2, '0');
    if (centiseconds === '100') centiseconds = '99';
    let obj = {
      hours,
      minutes,
      seconds,
      centiseconds,
    };
    this.renderDisplay(obj);
  }

  runTimer() {
    this.startTime = new Date();
    this.handler = setInterval(() => {
      this.renderTime(new Date());
    }, 25);
  }

  storeElapsedTime() {
    this.elapsedTime += (new Date() - this.startTime);
  }

  toggleState() {
    let controlBtn = document.getElementById('controlBtn');
    
    if (this.running) {
      controlBtn.textContent = 'Start';
      this.storeElapsedTime();
      clearInterval(this.handler);
    } else {
      this.runTimer();
      controlBtn.textContent = 'Stop';
    }

    this.running = !this.running;
  }

  resetDisplay() {
    this.initializeDisplay();
  }

  resetState() {
    this.running = false;
    clearInterval(this.handler);
    this.elapsedTime = 0;
    controlBtn.textContent = 'Start';
    this.resetDisplay();
  }

  addListeners() {
    let controlBtn = document.getElementById('controlBtn');
    let resetBtn = document.getElementById('resetBtn');

    controlBtn.addEventListener('click', ({target}) => {
      this.toggleState();
    })

    resetBtn.addEventListener('click', event => {
      this.resetState();
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  new App();
})