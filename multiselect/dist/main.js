const display = document.querySelector('input');
const checkAll = document.querySelector('.check-all');
const options = document.querySelectorAll('.option');

class Select {
  constructor (display, options, checkAll) {
    this.display = display;
    this.options = options;
    this.checkAll = checkAll;


    this.className = 'selected'
    this.itemsSelecteds = [];

    this.addEvents();
  }

  getText(element) {
    return element.innerText;
  }

  checkIfAllOptionsIsSelecteds() {
    return [...this.options].every(option => option.classList.contains(this.className));
  }

  selectAll = () => {
    if (this.checkAll.classList.contains(this.className)) {
      this.checkAll.classList.remove(this.className);
      this.options.forEach(option => option.classList.remove(this.className));

      this.itemsSelecteds = [];
    }

    else {
      this.checkAll.classList.add(this.className);
      this.options.forEach(option => {
        if (option.classList.contains(this.className)) return;

        option.classList.add(this.className);
        this.itemsSelecteds = [...this.itemsSelecteds, this.getText(option)];
      });
    }

    this.displayItems();
  }

  select = optionIndex => {
    const optionSelected = this.options[optionIndex];
    const textValue = this.getText(optionSelected)

    if (optionSelected.classList.contains(this.className)) {
      optionSelected.classList.remove(this.className);
      this.itemsSelecteds = [...this.itemsSelecteds].filter(item => item !== textValue);
    }
    
    else {
      optionSelected.classList.add(this.className);
      this.itemsSelecteds = [...this.itemsSelecteds, textValue];
    }

    this.displayItems();

    if (this.checkIfAllOptionsIsSelecteds()) this.checkAll.classList.add(this.className);
    else this.checkAll.classList.remove(this.className);
  }

  displayItems() {
    const [fistValue, secundValue, ...rest] = this.itemsSelecteds;

    let text = '';

    if (fistValue) text = `${fistValue}`

    if (secundValue) text += `, ${secundValue}`;

    if (rest.length > 0)  text += ` and ${rest.length} more`;

    this.display.value = text;
  }

  addEvents() {
    this.options.forEach((option, index) => option.addEventListener('click', () => this.select(index)));
    this.checkAll.addEventListener('click', this.selectAll);
  }
}

new Select(display, options, checkAll);
