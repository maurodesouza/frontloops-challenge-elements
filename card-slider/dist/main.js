const rightButton = document.querySelector('.right');
const leftButton = document.querySelector('.left');

const slide = document.querySelector('.slide');

class Slide {
  constructor(slideContainer, rightButton, leftButton) {
    this.slideContainer = slideContainer;
    this.slideItems = this.slideContainer.children;

    this.rightButton = rightButton;
    this.leftButton = leftButton;

    this.previousSlideItemIndex = undefined;
    this.currentSlideItemIndex = 0;
    this.nextSlideItemIndex = 1;

    this.widthsOfSlideItems = [];
    this.totalWidthOfSlideItems = 0;
    this.excess = 0;

    this.finalPosition = 0;
    this.isIntheEnd = false;
    this.compensate = 0;

    this.init();
  }

  updateCurrentSlideItem(index) {
    this.currentSlideItemIndex = index;
    this.nextSlideItemIndex = index + 1;
    this.previousSlideItemIndex = index - 1;
  }

  checkIfArrivesInStart() {
    if (!this.previousSlideItemIndex) {
      this.leftButton.style.display = 'none';
    }
  }

  checkIfArrivesInEnd(offset) {
    if (this.excess < Math.abs(offset)) {
      this.isIntheEnd = true;
      this.compensate = this.excess + this.finalPosition;

      const totalOffset = this.finalPosition - this.compensate;

      this.rightButton.style.display = 'none';
  
      this.moveSlide(totalOffset);
      this.finalPosition = totalOffset;
    } else {
      this.moveSlide(offset);
      this.finalPosition = offset;
    }
  }

  toLeft = () => {
    this.leftButton.style.display = 'flex';

    const widthOfCurrentElement = this.widthsOfSlideItems[this.currentSlideItemIndex];

    const totalOffset = this.finalPosition - widthOfCurrentElement;

    this.checkIfArrivesInEnd(totalOffset);
    this.updateCurrentSlideItem(this.nextSlideItemIndex);
  }

  toRight = () => {
    let totalOffset = undefined;

    if (this.isIntheEnd) {
      totalOffset = this.finalPosition + this.compensate;

      this.rightButton.style.display = 'flex';

      this.isIntheEnd = false;
    } else {
      const widthOfPreviusElement = this.widthsOfSlideItems[this.previousSlideItemIndex];
  
      totalOffset = this.finalPosition + widthOfPreviusElement;
    }

    this.finalPosition = totalOffset;
  
    this.moveSlide(totalOffset);
    this.checkIfArrivesInStart();
    this.updateCurrentSlideItem(this.previousSlideItemIndex);
  }

  moveSlide(offset) {
    this.slideContainer.style.transform = `translateX(${offset}px)`;
  }

  toNumber(string) {
    return Number(string.replace(/\D/g, ''));
  }

  getWidthOfSlideItems() {
    const widthOfSlideContainer = this.slideContainer.getBoundingClientRect().width;

    this.widthsOfSlideItems = [...this.slideItems].reduce((amount, item) => {
      const width = item.getBoundingClientRect().width;
      const marginLeft = this.toNumber(window.getComputedStyle(item).marginLeft);
      const marginRight = this.toNumber(window.getComputedStyle(item).marginRight);

      const widthWithMargins = width + marginLeft + marginRight;

      amount.push(widthWithMargins);

      return amount;
    }, []);

    this.totalWidthOfSlideItems = this.widthsOfSlideItems.reduce((amount, width) => amount + width, 0);

    this.excess = this.totalWidthOfSlideItems - widthOfSlideContainer;
  }

  addEvents() {
    this.rightButton.addEventListener('click', this.toLeft);
    this.leftButton.addEventListener('click', this.toRight);
  }

  init() {
    this.addEvents();
    this.getWidthOfSlideItems();
  }
}

new Slide(slide, rightButton, leftButton);
