const autoTypeElement = document.querySelector('.auto-type');
const words = [
  'design',
  'frontend',
  'backend',
  'testing'
];

const timeToWrite = 400;
const timeToWait = 2000;
const timeToDelete = 200;

let isDeleting = false;
let textToWrite = '';
let currentWord = 0;
let typeSpeed = timeToWrite;

const type = () => {
  const textOfCurrentWord = words[currentWord];

  if (isDeleting) [
    (textToWrite = textOfCurrentWord.substring(0, textToWrite.length - 1)),
    (typeSpeed = timeToDelete)
  ];

  else textToWrite = textOfCurrentWord.substring(0, textToWrite.length + 1);

  autoTypeElement.innerText = textToWrite;

  if (!isDeleting && textToWrite === textOfCurrentWord) 
    [(typeSpeed = timeToWait), (isDeleting = true)];
  else if (isDeleting && textToWrite === '')
    [(typeSpeed = timeToDelete), (isDeleting = false), (
      currentWord = (currentWord + 1) >= words.length ? 0 : (currentWord + 1)
    )];

  setTimeout(() => type(), typeSpeed);
};

document.addEventListener('DOMContentLoaded', type);
