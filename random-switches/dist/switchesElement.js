const amount = 5;

const container = document.querySelector('.container');

for(let i = 0; i < 5; i++) {
  const containerSwitch = document.createElement('label');
  const input = document.createElement('input');
  const slider = document.createElement('span');

  containerSwitch.classList.add('switch');
  input.type = 'checkbox';
  slider.classList.add('slider');

  containerSwitch.append(input);
  containerSwitch.append(slider);

  container.append(containerSwitch);
};
