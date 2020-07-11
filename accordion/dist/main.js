const cards = document.querySelectorAll('.card');
const grows = document.querySelectorAll('.grow');

const box = document.querySelectorAll('.grow .box');

const reset = index => {
  cards[index].classList.remove('active');
  grows[index].style.height = `${0}px`;
}

function toggle(index) {
  cards.forEach((_, i) => index !== i ? reset(i) : '');

  if (cards[index].classList.contains('active')) reset(index);

  else {
    cards[index].classList.add('active');
    const height = box[index].offsetHeight;
    grows[index].style.height = `${height}px`;
  }
}

cards.forEach((card, index) => card.addEventListener('click', () => toggle(index)));