class ScrollBar {
  constructor(element, scroll) {
    this.element = document.querySelector(element);
    this.scroll = document.querySelector(scroll);

    this.init();
  }

  onScroll = () => {
    const trackPiece = (this.scroll.clientHeight - this.thumbHeight);

    const scrollPercentage = (this.element.scrollTop * 100) / (this.element.scrollHeight - this.element.clientHeight);

    const movement = trackPiece * scrollPercentage / 100;
  
    this.scroll.children[0].style.top = `${movement}px`;
  }

  calculateScrollThumbHeight = () => {
    this.thumbHeight = this.scroll.clientHeight * (this.element.clientHeight / this.element.scrollHeight);

    this.scroll.children[0].style.height = `${this.thumbHeight}px`;
  }

  addEvents = () => {
    this.element.addEventListener('scroll', this.onScroll);
  }

  init = () => {
    this.addEvents();
    this.calculateScrollThumbHeight();
  }
}

new ScrollBar('.content', '.scrollbar');
