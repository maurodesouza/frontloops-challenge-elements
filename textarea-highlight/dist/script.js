const textarea = document.querySelector('.textarea');
const highlight = document.querySelector('.highlights');

const handleInput = () => {
  const text = textarea.value;

  const hightlightText = text.replace(/#\w+/gi, '<mark>$&</mark>');

  highlight.innerHTML = hightlightText;
}

textarea.addEventListener('input', handleInput);