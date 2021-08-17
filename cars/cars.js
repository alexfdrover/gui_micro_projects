const cars = [
  { make: 'Honda', image: './resources/honda-accord-2005.jpeg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: './resources/honda-accord-2008.jpeg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: './resources/toyota-camry-2009.jpeg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: './resources/toyota-corrolla-2016.jpeg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: './resources/suzuki-swift-2014.jpeg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: './resources/audi-a4-2013.jpeg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: './resources/audi-a4-2013.jpeg', model: 'A4', year: 2013, price: 26000 },
];

class App {
  constructor() {
    this.renderOptions(cars);
    this.renderImages(cars);
    this.addListeners();
  }

  clearImages() {
    document.getElementById('grid').innerHTML = '';
  }

  renderImages(cars) {
    this.clearImages();
    let grid = document.getElementById('grid');
    cars.forEach(car => {
      let figure = document.createElement('figure');
      figure.classList.add('grid-item');

      let img = document.createElement('img');
      img.setAttribute('src', car.image);

      let h2 = document.createElement('h2');
      h2.textContent = car.make + ' ' + car.model;

      let p1 = document.createElement('p');
      p1.textContent = 'Year: ' + car.year;

      let p2 = document.createElement('p');
      p2.textContent = 'Price: $' + car.price;

      [img, h2, p1, p2].forEach(item => {
        figure.appendChild(item);
      });
      
      grid.appendChild(figure);
    });
  }

  renderOptions(cars) {
    cars.forEach(car => {
      ['make', 'model', 'price', 'year'].forEach(choice => {
        let value = car[`${choice}`]

        let select = document.querySelector(`[name="${choice}"]`);
        let option = document.createElement('option');
        option.setAttribute('value', value);
        option.textContent = value
        if (!select.querySelector(`[value="${value}"]`)) {
          select.appendChild(option);
        }
      });
    });
  }

  clearOptions() {
    let options = document.querySelectorAll('option');
    options.forEach(option => {
      if (option.closest('select').getAttribute('name') === 'make') {

      } else if (option.value !== 'All') {
        option.remove();
      }
    });
  }

  filterOptions(make, model, price, year) {
    let results = cars.filter(car => {
      let carMake = make;
      let carModel = model;
      let carPrice = price;
      let carYear = year;
      if (carMake === 'All') carMake = car.make;
      if (carModel === 'All') carModel = car.model;
      if (carPrice === 'All') carPrice = car.price;
      if (carYear === 'All') carYear = car.year;
      return carMake == car.make && carModel == car.model && carPrice == car.price && carYear == car.year;
    });
    return results;
  }

  addListeners() {
    let form = document.querySelector('form');
    form.addEventListener('click', event => {
      if (event.target.tagName === 'BUTTON') {
        event.preventDefault();
        let makeVal = document.querySelector('#make > select').value;
        let modelVal = document.querySelector('#model > select').value;
        let priceVal = document.querySelector('#price > select').value;
        let yearVal = document.querySelector('#year > select').value;
        let results = this.filterOptions(makeVal, modelVal, priceVal, yearVal);
        this.renderImages(results);
      }
    });

    let make = document.querySelector('select[name="make"]');
    make.addEventListener('change', event => {
      let modelVal = document.querySelector('#model > select').value;
      let priceVal = document.querySelector('#price > select').value;
      let yearVal = document.querySelector('#year > select').value;
      let results = this.filterOptions(make.value, modelVal, priceVal, yearVal);
      this.clearOptions();
      this.renderOptions(results);
    });
  }
}



document.addEventListener('DOMContentLoaded', event => {
  new App();
})