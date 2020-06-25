class Draggable {
  constructor(element) {
    this.element = element;
    
    this.initialClickPositionOnElement = null;
    this.isDragging = false;

    this.initEvents();
  }

  takeElement = e => {
    if (e.button !== 0) return;

    this.isDragging = true;
  
    const positionX = e.clientX - this.element.offsetLeft;
    const positionY = e.clientY - this.element.offsetTop;

    this.initialClickPositionOnElement = {
      x: positionX,
      y: positionY,
    };

    this.element.addEventListener('mousemove', this.dragElement);
    this.element.addEventListener('mouseup', this.dropElement);
    this.element.addEventListener('mouseleave', this.dropElement);
  }

  dragElement = e => {
    if (this.isDragging) {
      const positionX = e.clientX - this.initialClickPositionOnElement.x;
      const positionY = e.clientY - this.initialClickPositionOnElement.y;
  
      this.element.style.top = `${positionY}px`;
      this.element.style.left = `${positionX}px`;
    }
  }

  dropElement = () => {
    this.isDragging = false;

    this.element.removeEventListener('mousemove', this.dragElement);
    this.element.removeEventListener('mouseup', this.dropElement);
    this.element.removeEventListener('mouseleave', this.dropElement);
  }

  initEvents() {
    this.element.addEventListener('mousedown', this.takeElement);
  }
}

new Draggable(document.querySelector('.card'));
