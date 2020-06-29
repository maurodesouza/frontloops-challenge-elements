class Validation {
  constructor(classForm, classInputs) {
    this.form = document.querySelector(classForm);
    this.inputs = document.querySelectorAll(classInputs);

    this.emailRegex = /\S+@\S+\.\S+/;
    this.isValidSubmit = true;

    this.addEvents();
  }

  initValidation = e => {
    e.preventDefault();

    this.removeInputErrorText();

    this.validadeInputName();
    this.validateInputEmail();
    this.validadeInputPassword();

    if (this.isValidSubmit) alert('Successful submit !!!');
  }

  validadeInputName() {
    const inputName = [...this.inputs].find(input => input.id === 'name');

    if (inputName.value === '') this.inputErrorText(inputName);
  }

  validateInputEmail() {
    const inputEmail = [...this.inputs].find(input => input.id === 'email');

    if (inputEmail.value === '') return;

    if (!this.emailRegex.test(inputEmail.value)) this.inputErrorText(inputEmail, 'Enter valid email');
  }

  validadeInputPassword() {
    const inputPassword = [...this.inputs].find(input => input.id === 'password');

    if (inputPassword.value === '') this.inputErrorText(inputPassword);
    else this.validadeInputConfirmPassword(inputPassword.value);
  }

  validadeInputConfirmPassword(value) {
    const inputConfirmPassword = [...this.inputs].find(input => input.id === 'confirmPassword');

    if (inputConfirmPassword.value === '' || inputConfirmPassword.value !== value)
      this.inputErrorText(inputConfirmPassword, 'Confirmation failed');
  }

  inputErrorText(element, text = 'Field is required') {
    this.isValidSubmit = false;

    const span = document.createElement('span');

    span.classList.add('input-error-text');

    span.innerText = text;

    element.after(span);
  }

  removeInputErrorText() {
    this.isValidSubmit = true;

    document.querySelectorAll('.input-error-text')
      .forEach(text => text.remove());
  }

  addEvents() {
    this.form.addEventListener('submit', this.initValidation);
  }
}

new Validation('.form', 'input');
