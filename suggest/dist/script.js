const input = document.querySelector('.select input');
const optionsContainer = document.querySelector('.select .options');

const debounce = (fn, wait = 500, time) => (...args) => 
  clearTimeout(time, time = setTimeout(() => fn(...args), wait));

const selectValue = value => {
  input.value = value;

  optionsContainer.innerHTML = '';
  optionsContainer.classList.remove('active');
}

const fetchOptions = async query => {
  const response = await fetch(`https://swapi.dev/api/people?search=${query}`);
  const { results } = await response.json();

  const firstFive = results.slice(0, 5);

  return firstFive.map(item => item.name);
}

const showOptions = options => {
  optionsContainer.innerHTML = '';

  options.map(option => {
    const p = document.createElement('p');

    p.innerText = option;

    p.onclick = () => selectValue(option);

    optionsContainer.append(p);
  })
}

const handleKeyup = async () => {
  if (!input.value) return;

  const options = await fetchOptions(input.value);

  if (!!options.length) {
    showOptions(options);
    optionsContainer.classList.add('active');
  } else {
    optionsContainer.classList.remove('active');
  }
}

input.addEventListener('keyup', debounce(handleKeyup));
