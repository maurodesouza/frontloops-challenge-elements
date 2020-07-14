class DotMove {
  constructor() {
    this.container = document.querySelector('.container');
    this.dot = document.querySelector('.dot');

    this.maxWidth = this.container.clientWidth - this.dot.clientWidth;
    this.maxHeight = this.container.clientHeight - this.dot.clientHeight;

    this.position = {
      x: 0,
      y: 0,
    }

    this.speed = 10;
    this.keyPressed = {}

    this.init();
  }

  calcutaleNewPositionX = (oldPositionX, keyCode1, keyCode2) => {
    const newPositionX = parseInt(oldPositionX, 10)
      - (this.keyPressed[keyCode1] ? this.speed : 0)
      + (this.keyPressed[keyCode2] ? this.speed : 0)

    const value = newPositionX < 0 ? 0 : newPositionX > this.maxWidth ? this.maxWidth : newPositionX

    this.position.x = value
    return value; 
  }

  calcutaleNewPositionY = (oldPositionY, keyCode1, keyCode2) => {
    const newPositionY = parseInt(oldPositionY, 10)
      - (this.keyPressed[keyCode1] ? this.speed : 0)
      + (this.keyPressed[keyCode2] ? this.speed : 0);

    const value = newPositionY < 0 ? 0 : newPositionY > this.maxHeight ? this.maxHeight : newPositionY; 

    this.position.y = value
    return value; 
  }

  updatePosition = () => {
    this.dot.style.top = `${this.calcutaleNewPositionY(this.position.y, 'ArrowUp', 'ArrowDown')}px`;
    this.dot.style.left = `${this.calcutaleNewPositionX(this.position.x, 'ArrowLeft', 'ArrowRight')}px`;
  }

  addEvents = () => {
    window.addEventListener('keydown', e => this.keyPressed[e.key] = true);
    window.addEventListener('keyup', e => this.keyPressed[e.key] = false);
  }

  init = () => {
    this.addEvents();

    setInterval(() => this.updatePosition(), 20);
  }
}

new DotMove();
