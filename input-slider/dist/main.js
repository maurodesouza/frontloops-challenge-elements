class InputSlider {
  constructor() {
    this.inputSlider = document.querySelector('.input-slider');
    this.output = document.querySelector('.value');

    this.init();
  }

  changeProgress = () => {
    const value = this.inputSlider.value;
    const color = `linear-gradient(to right, #738081 ${value}%, #EDEDEC ${value}%)`;

    this.inputSlider.style.background = color;
  }

  updateValue = () => {
    this.output.innerText = this.inputSlider.value;
  }

  addEvents = () => {
    this.inputSlider.addEventListener('mousemove', this.changeProgress);
    this.inputSlider.addEventListener('input', this.updateValue);
  }

  init = () => {
    this.addEvents();
    this.changeProgress();
    this.updateValue();
  }
}

new InputSlider();
