const container = document.querySelector('.container');

const image = document.querySelector('.container > img');
const zoomedImage = document.querySelector('.zoomed img');

const {
  left: imageOffsetLeft,
  top: imageOffsetTop,
  width: imageWidth,
  height: imageHeight
} = image.getBoundingClientRect();

const {
  width: zoomedImageWidth,
  height: zoomedImageHeight
} = zoomedImage.getBoundingClientRect();

const onMouseEnter = () => {
  container.classList.add('active');

  image.addEventListener('mousemove', onMouseMove);
  image.addEventListener('mouseleave', onMouseLeave);
}

const onMouseMove = e => {
  const positionXRelativeImage = e.clientX - imageOffsetLeft;
  const positionYRelativeImage = e.clientY - imageOffsetTop;
  
  const imagePositions = {
    XinPercent: positionXRelativeImage * 100 / imageWidth,
    YinPercent: positionYRelativeImage * 100 / imageHeight,
  }

  const moveZoomedImagePositionX = zoomedImageWidth * imagePositions.XinPercent / 100;
  const moveZoomedImagePositionY = zoomedImageHeight * imagePositions.YinPercent / 100;

  const zoomedImagePositions = {
    XinPercent: moveZoomedImagePositionX * 100 / zoomedImageWidth,
    YinPercent: moveZoomedImagePositionY * 100 / zoomedImageHeight,
  }

  const x = zoomedImagePositions.XinPercent;
  const y = zoomedImagePositions.YinPercent;

  zoomedImage.style.transform = `translate3d(-${x}%, -${y}%, 0)`
}

const onMouseLeave = () => {
  container.classList.remove('active');

  image.removeEventListener('mousemove', onMouseMove);
  image.removeEventListener('mouseleave', onMouseLeave);
}

image.addEventListener('mouseenter', onMouseEnter);
