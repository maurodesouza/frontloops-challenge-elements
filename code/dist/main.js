const inputs = document.querySelectorAll('input');
const form = document.querySelector('form');

class Code {
  constructor (form, inputs) {
    this.form = form;
    this.inputs = inputs;

    this.currentInput = null;
    this.nextInput = null;
    this.previousInput = null;

    this.addEvents();
  }

  setCurrentInput(currentInput) {
    inputs.forEach(input => input.classList.remove('current'));

    this.currentInput = currentInput;

    this.setNextAndPreviousInputs();

    this.currentInput.focus()
    this.currentInput.classList.add('current');
  }

  setNextAndPreviousInputs() {
    const currentIndex = [...this.inputs].findIndex(input => input === this.currentInput);

    this.nextInput = this.inputs[currentIndex + 1];
    this.previousInput = this.inputs[currentIndex - 1];
  }

  getFirstInputEmpty = () => [...this.inputs].find(input => input.value === '');

  checkIfExistEmptyInput = () => {
    const emptyInput = this.getFirstInputEmpty();

    if (emptyInput) this.setCurrentInput(emptyInput);

    else this.setCurrentInput(this.inputs[this.inputs.length - 1]);
  }

  onBlur = () => this.currentInput.classList.remove('current');

  validateEntry = () => {
    const value = this.currentInput.value;
    const regex = /\d/g;

    if (!regex.test(value)) {
      this.currentInput.value = '';
      return;
    }
  
    if (value.length > 1) {
      this.currentInput.value = this.currentInput.value.substring(0, 1);
    }

    this.nextInput ? this.setCurrentInput(this.nextInput) : null;
  }

  isErasing = e => {
    if (this.currentInput.value === '' && e.key === 'Backspace' && this.previousInput) {

      this.previousInput.value = '';
      this.setCurrentInput(this.previousInput);
    }
  }

  onSubmit = e => {
    e.preventDefault();

    let values = [];

    if (this.getFirstInputEmpty()) return;
  
    this.inputs.forEach(input => values.push(input.value));
  
    alert(`value is ${[...values].join('')}`);
  }

  addEvents() {
    this.inputs.forEach(input => input.addEventListener('keyup', this.validateEntry));
    this.inputs.forEach(input => input.addEventListener('keydown', this.isErasing));

    this.inputs.forEach(input => input.addEventListener('blur', this.onBlur));
    this.inputs.forEach(input => input.addEventListener('focus', this.checkIfExistEmptyInput));

    this.form.addEventListener('submit', e => this.onSubmit)
  }
}

new Code(form, inputs);
