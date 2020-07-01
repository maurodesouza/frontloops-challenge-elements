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
    this.hasChangeColor = false;

    this.currentPalette = 0;
    this.nextPalette = 1;
    this.previousPalette = this.palettes.length - 1;

    this.addPalettes();
    this.addEvents();

    this.keyHandlers = {
      Tab: () => this.keyPress['Shift'] ? this.togglePalettesContainer() : null,

      ArrowLeft: () => this.activeFocus(this.previousPalette),

      ArrowRight: () => this.activeFocus(this.nextPalette),

      Enter: () => this.isOpen ? this.changeBackground() : null,
    };
  }

  togglePalettesContainer() {
    this.palettesContainer.classList.toggle('show');
    this.isOpen = !this.isOpen;

    if (this.isOpen) {

      if (this.hasChangeColor)  this.activeFocus(this.nextPalette);

      else this.activeFocus(this.getNextPaletteByBackground());

      this.hasChangeColor = false;
    }
  }

  activeFocus(paletteIndex) {
    this.palettes[paletteIndex].focus();
    this.setCurrentPalette(paletteIndex);
  }

  setCurrentPalette(indexOfPalette) {
    this.currentPalette = indexOfPalette;

    this.nextPalette =
      this.palettes[indexOfPalette + 1] ? indexOfPalette + 1 : 0;

    this.previousPalette =
      this.palettes[indexOfPalette - 1] ? indexOfPalette - 1 : this.palettes.length -1;
  }

  changeBackground() {
    const color = window.getComputedStyle(this.palettes[this.currentPalette]).backgroundColor;
    document.body.style.backgroundColor = color;

    this.hasChangeColor = true;
    this.togglePalettesContainer();
  }

  getNextPaletteByBackground() {
    const color = document.body.style.backgroundColor;

    const activePaletteIndex = this.palettes.findIndex(palette => 
      window.getComputedStyle(palette).backgroundColor === color);

    const nextPalette =
      this.palettes[activePaletteIndex + 1] ? activePaletteIndex + 1 : 0;

    return nextPalette;
  }

  keyDownListener = e => {
    if (e.key === 'Tab') e.preventDefault();

    this.keyPress[e.key] = true;

    const handler = this.keyHandlers[e.key];

    if (handler) handler();
  }

  changeByClick(paletteIndex) {
    this.activeFocus(paletteIndex);
    this.changeBackground();
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
    document.addEventListener('keyup', e => delete this.keyPress[e.key]);
  
    this.palettes.forEach((palette, index) =>
      palette.addEventListener('click', () => this.changeByClick(index)));
  }
}

new Palettes('.palettes', colors);
