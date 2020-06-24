const sticky = document.querySelectorAll('.sticky');

class Sticky {
  constructor(stickyElement, positionToStop) {
    this.stickyElement = stickyElement;
    this.positionToStop = positionToStop;

    this.nextElement = this.stickyElement.nextElementSibling;
    this.clone = this.stickyElement.cloneNode();

    this.clone.style.opacity = 0;

    this.stickyMarginTop = this.toNumber(this.getComputedStyle(this.stickyElement, 'marginTop'));

    this.stickyOffsetTop = window.pageYOffset + this.stickyElement.getBoundingClientRect().top;
    this.positionYToStopSticky = this.stickyOffsetTop - this.positionToStop;

    this.isFixeded = false;

    this.undoFixedElementStyles = [
      {
        style: 'marginTop',
        value: `${this.stickyMarginTop}px`,
      },
      {
        style: 'position',
        value: 'initial',
      },
    ];

    this.fixedElementStyles = [
      {
        style: 'marginTop',
        value: 0,
      },
      {
        style: 'position',
        value: 'fixed',
      },
      {
        style: 'top',
        value: `${this.positionToStop}px`,
      },
    ];

    this.setLeftProperty();
  }

  setLeftProperty() {
    const leftDistance = this.stickyElement.getBoundingClientRect().left;

    this.stickyElement.style.left = `${leftDistance}px`;
  }

  toNumber = string => Number(string.replace(/\D/g, ''));

  getComputedStyle = (element, style = '') => window.getComputedStyle(element)[style];

  sticky = () => {
    if (!this.isFixeded && window.pageYOffset >= this.positionYToStopSticky) this.fixedElement();

    else if (this.isFixeded && window.pageYOffset <= this.positionYToStopSticky) this.undoFixedElement();
  }

  undoFixedElement() {
    this.undoFixedElementStyles.forEach(style => this.stickyElement.style[style.style] = style.value);
    this.clone.remove();
    this.isFixeded = false;
  }

  fixedElement() {
    this.nextElement ? this.nextElement.before(this.clone) : '';
    this.fixedElementStyles.forEach(style => this.stickyElement.style[style.style] = style.value);
    this.isFixeded = true;
  }
}

let stickyEffects = [];

sticky.forEach(element => stickyEffects.push(new Sticky(element, 30)));

window.addEventListener('scroll', () => stickyEffects.forEach(s => s.sticky()));
