const loadCardsButton = document.querySelector('.load-cards');

let page = 1;

const loadCards = async () => {
  loadCardsButton.classList.add('loading');
  loadCardsButton.disabled = true;

  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`)
  const { results, next } = await response.json();

  showCards(results);

  if (next) {
    page = page + 1;
    loadCardsButton.classList.remove('loading');
    loadCardsButton.disabled = false;
  } else {
    loadCardsButton.classList.remove('loading');
  }
}

const showCards = cards => {
  const div = document.createElement('div');

  cards.forEach(card => {
    const p = document.createElement('p');

    p.innerText = card.name;

    div.append(p);
  })

  div.classList.add('grow')

  loadCardsButton.before(div);

  if (page === 2) {
    setTimeout(() => {
      window.scrollTo({
        behavior: "smooth",
        top: 100,
      });
    }, 1000);

    return;
  }

  document.body.scrollBy({
    behavior: 'smooth',
    top: 1000,
  });
}

loadCardsButton.addEventListener('click', loadCards);
