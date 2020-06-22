const cards = document.querySelectorAll('.card');

const debounce = (fn, counter = 0, checkRange = 3) => (...args) =>
  counter++ % checkRange === 0 ? fn(...args) : null;

const windowHeight60Percent = window.innerHeight * .6;

const checkDistanceToTop = () =>
  cards.forEach(card => {
    const distanceToTop = card.getBoundingClientRect().top;

    distanceToTop < windowHeight60Percent ?
      card.classList.add('show') : card.classList.remove('show');
  });

window.addEventListener('scroll', debounce(checkDistanceToTop));
