const card = document.querySelector('.card');
const baseElement = document.body;

const debounce = (fn, updateRange = 10, counter = 0) => (...args) =>
  counter++ % updateRange === 0 ? fn(...args) : null;

class Effetc3D {
  constructor(baseElement, element3D) {
    this.baseElement = baseElement;
    this.element3D = element3D;

    this.mousePositionX = 0;
    this.mousePositionY = 0;
    this.originPositionX = 0;
    this.originPositionY = 0;

    this.setOriginPosition();
  };

  setOriginPosition() {
    this.originPositionX = this.baseElement.offsetLeft + (this.baseElement.offsetWidth / 2);
    this.originPositionY = this.baseElement.offsetTop + (this.baseElement.offsetHeight / 2);
  }

  updateMousePosition(clientX, clientY) {
    this.mousePositionX = clientX - this.originPositionX;
    this.mousePositionY = (clientY - this.originPositionY) * -1;
  }

  updateElement3D() {
    const y = this.mousePositionY / this.element3D.offsetHeight / 2;
    const x = this.mousePositionX / this.element3D.offsetWidth / 2;
  
    this.element3D.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  }

  resetElement3D = () => this.element3D.style.transform = `initial`;

  applyEffect3D = event => {
    this.updateMousePosition(event.clientX, event.clientY);
    this.updateElement3D();
  } 
}

const { resetElement3D, applyEffect3D } = new Effetc3D(baseElement, card);

document.addEventListener('mousemove', debounce(applyEffect3D));
document.addEventListener('mouseleave', resetElement3D);
