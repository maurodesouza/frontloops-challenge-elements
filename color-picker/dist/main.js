const colors = [
  '#318DD9',
  '#2AC567',
  '#F29213',
  '#E34136',
  '#924DAE',
];

class Palettes {
  constructor (palettesContainerClass, colors) {
    this.palettesContainer = document.querySelector(palettesContainerClass);
    this.palettes = [];
    this.colors = colors;

    this.keyPress = {};
    this.isOpen = false;

    this.currentPalette = 0;
    this.nextPalette = 1;

    this.addPalettes();
    this.addEvents();
  }

  togglePalettesContainer() {
    this.palettesContainer.classList.toggle('show');
    this.isOpen = !this.isOpen;

    if (this.isOpen) this.activeFocus(this.nextPalette);
  }

  activeFocus(paletteIndex) {
    this.palettes[paletteIndex].focus();
    this.setCurrentPalette(paletteIndex);
  }

  setCurrentPalette(indexOfPalette) {
    this.currentPalette = indexOfPalette;

    this.nextPalette =
      this.palettes[indexOfPalette + 1] ? indexOfPalette + 1 : 0;
  }

  changeBackground() {
    const color = window.getComputedStyle(this.palettes[this.currentPalette]).backgroundColor;
    document.body.style.backgroundColor = color;

    this.togglePalettesContainer();
  }

  keyDownListener = e => {
    this.keyPress[e.key] = true;

    if (e.key === 'Tab') {
      e.preventDefault();

      if (this.keyPress['Shift'] && !this.isOpen) this.togglePalettesContainer();
      else if (this.keyPress['Shift'] && this.isOpen) this.activeFocus(this.nextPalette);
    }
  }

  keyUpListener = e => {
    if (e.key === 'Shift') this.changeBackground();

    delete this.keyPress[e.key];
  }

  addPalettes() {
    this.colors.forEach(color => {
      const palette = document.createElement('div');
    
      palette.classList.add('palette');
      palette.style.backgroundColor = color;
      palette.tabIndex = -1;

      this.palettes.push(palette);
      this.palettesContainer.append(palette);
    });
  }

  addEvents() {
    document.addEventListener('keydown', this.keyDownListener);
    document.addEventListener('keyup', this.keyUpListener);
  }
}

new Palettes('.palettes', colors);
