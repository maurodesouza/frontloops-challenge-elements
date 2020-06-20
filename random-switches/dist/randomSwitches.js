const switches = document.querySelectorAll('.switch input');

const randomNumber = (firstAvoid, secundAvoid = firstAvoid) => {
  const num = Math.floor(Math.random() * 5);

  return (num === firstAvoid || num === secundAvoid ) ?
    randomNumber(firstAvoid, secundAvoid) : num;
};

switches.forEach((swi, index) => swi.addEventListener('click', () => {
  const firstNumber = randomNumber(index);

  const first = switches[firstNumber];
  first.checked = !first.checked;

  const secund = switches[randomNumber(index, firstNumber)];
  secund.checked = !secund.checked;
}));
