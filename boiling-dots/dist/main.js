const form = document.querySelector('.form');
const input = document.querySelector('.form input');
const boilingContainer = document.querySelector('.boilings');

class Boiling {
  constructor(timeInSec, dist) {
    this.timeInSec = timeInSec;
    this.dist = dist;

    this.interval = null;
    
    this.init();
  }

  updateBoiling(value) {
    this.boiling.innerText = value;
  }

  deleteBoiling() {
    clearInterval(this.interval);
  
    this.boiling.style.opacity = '0';

    setTimeout(() => this.boiling.remove(), 400);
  }

  reachedZero(value) {
    if (value === 0) this.deleteBoiling();
    else this.updateBoiling(value);
  }

  countdown() {
    this.interval = setInterval(() => {
      this.timeInSec = this.timeInSec - 1;

      this.reachedZero(this.timeInSec);
    }, 1000);
  }

  configBoiling() {
    this.boiling = document.createElement('span');
    
    this.boiling.classList.add('boiling');
    this.boiling.innerText = this.timeInSec;

    this.dist.append(this.boiling);
  }

  init() {
    this.configBoiling();
    this.countdown();
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  if (input.value > 0) {
    new Boiling(input.value, boilingContainer);

    input.value = '';
  }

  else input.value = '';
});
