const cursor = document.querySelector('.cursor');

const cursorSize = 15;

cursor.style.width = `${cursorSize}px`;
cursor.style.height = `${cursorSize}px`;

class BollMark {
  constructor({
    positionX,
    positionY,
  }) {
    this.positionX = positionX;
    this.positionY = positionY;

    this.ballMarkSize = 70;

    this.addBallMark();
  }

  addBallMark() {
    this.element = document.createElement('div');
    this.element.classList.add('ball-mark');

    this.element.style.width = `${this.ballMarkSize}px`;
    this.element.style.height = `${this.ballMarkSize}px`;

    document.body.append(this.element);

    this.element.style.top = `${this.positionY - (this.ballMarkSize / 2)}px`;
    this.element.style.left = `${this.positionX - (this.ballMarkSize / 2)}px`;

    this.element.classList.add('closing')

    setTimeout(() => {
      this.element.remove();
    }, 2000);
  }
}

const moveCursor = e => {
  cursor.style.top = `${e.clientY - (cursorSize / 2)}px`;
  cursor.style.left = `${e.clientX - (cursorSize / 2)}px`;
}

const addMark = e => {
  new BollMark({ positionX: e.clientX, positionY: e.clientY });
}

window.addEventListener('mousemove', moveCursor);
window.addEventListener('mousedown', addMark);
