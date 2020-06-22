const btnsToOpenMenu = document.querySelectorAll('.btn-open-menu');
const btnsToCloseMenu = document.querySelectorAll('.btn-close-menu');

const sideMenu = document.querySelector('.side-menu-bg');
const menuContents = document.querySelectorAll('.menu-content');

const openMenu = menuContentIndex => {
  menuContents.forEach((content, index) => menuContentIndex === index ?
    content.classList.add('show') : content.classList.remove('show'));

  sideMenu.classList.add('opened');
};

const closeMenu = () => sideMenu.classList.remove('opened');

btnsToOpenMenu.forEach((button, index) => button.addEventListener('click', () => openMenu(index)));
btnsToCloseMenu.forEach(button => button.addEventListener('click', closeMenu));

sideMenu.addEventListener('click', ({ target, currentTarget }) => 
  target === currentTarget ? closeMenu() : null);
