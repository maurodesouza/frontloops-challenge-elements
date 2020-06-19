const sorts = document.querySelectorAll('.sort');
const selectElement = document.querySelector('.select-control');
const selectOptions = document.querySelectorAll('.select-control option');

const select = index => {
  sorts.forEach(sort => sort.classList.remove('selected'));
  sorts[index].classList.add('selected');
  
  selectOptions.forEach(option => option.removeAttribute('selected'));
  selectOptions[index].setAttribute('selected', true);
}

sorts.forEach((sort, index) => sort.addEventListener('click', () => select(index)));

selectElement.addEventListener('change', e => select(e.target.value));
