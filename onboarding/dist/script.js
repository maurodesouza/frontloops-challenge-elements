const startButton = document.querySelector('.button');
const overlay = document.querySelector('.overlay');
const onboardingItems = document.querySelectorAll('.onboarding__item');

let firstAlreadPassed = false;
let firstOnboarding = null;
let onboardingStarted = false;

const isLast = next => next === firstOnboarding;

const getNext = current =>  onboardingItems[current + 1] ? current + 1 : 0;

const firstOnboardingItem = index => {
  if (onboardingStarted) return;
  firstOnboarding = index;
}

const changeOnboarding = current => {
  if (!onboardingStarted) return;

  firstAlreadPassed = true;

  const next = getNext(current);

  if (isLast(next)) {
    return finishOnboarding()
  } 

  activeOnboarding(next);
}

const activeOnboarding = index => {
  onboardingItems.forEach((onboarding, i) => 
    i === index ? onboarding.classList.add('active') :
      onboarding.classList.remove('active'))
}

const startOnboarding = () => {
  if (firstOnboarding === null) return;

  overlay.classList.add('started');

  onboardingStarted = true;

  activeOnboarding(firstOnboarding);
}

const finishOnboarding = () => {
  overlay.classList.remove('started');

  onboardingStarted = false;
}

startButton.addEventListener('click', startOnboarding);

onboardingItems.forEach((onboarding, index) => {
  onboarding.addEventListener('click', () => firstOnboardingItem(index));
  onboarding.addEventListener('click', () => changeOnboarding(index));
})
