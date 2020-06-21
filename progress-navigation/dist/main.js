const steps = document.querySelectorAll('.steps p');
const overviews = document.querySelectorAll('.overviews > div');

const backButtons = document.querySelectorAll('button.back');
const nextButtons = document.querySelectorAll('button.next');

let currentStep = 0;

const toStep = indexOfElement => {  
  const previousStep = steps[indexOfElement - 1];
  
  if (indexOfElement === 0 || (previousStep && previousStep.classList.contains('active'))) {
    currentStep = indexOfElement;

    overviews.forEach(overview => overview.classList.remove('active'));
    overviews[currentStep].classList.add('active');
  
    steps.forEach((step, index) => index > currentStep ? step.classList.remove('active') : '');
  
    steps[currentStep] ? steps[currentStep].classList.add('active') : '';
  }
}

steps.forEach((step, index) => step.addEventListener('click', () => toStep(index)));

backButtons.forEach(button => button.addEventListener('click', () => toStep(currentStep - 1)));
nextButtons.forEach(button => button.addEventListener('click', () => toStep(currentStep + 1)));
