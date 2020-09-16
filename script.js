const projectsElement = document.querySelector('.projects');

const projects = [ 
  '3d-card',
  'accordion',
  'auto-type',
  'boiling-dots',
  'card-slider',
  'code',
  'color-picker',
  'custom-scroll',     
  'dot-container',
  'draggable-card',
  'input-slider',
  'multiselect',
  'onboarding',
  'paging',
  'progress-navigation',
  'random-switches',
  'ripple-cursor',
  'segmented-control',
  'show-on-scroll',
  'side-menu',
  'sticky',
  'suggest',
  'textarea-highlight',
  'toast',
  'todo-local-storage',
  'validation',
  'video-player',
  'week',
  'zoom'
];

const formatProjectName = (name) => name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

projects.forEach(project => {
  const li = document.createElement('li');
  const linkView = document.createElement('a');

  const info = document.createElement('div');

  const img = document.createElement('img');
  const p = document.createElement('p');

  const linkGithub = document.createElement('a');
  const i = document.createElement('i');

  linkView.href = `/${project}/dist/index.html`;
  linkView.target = '_blank';

  li.classList.add('project');
  info.classList.add('info');
  linkGithub.classList.add('icon');
  i.classList.add('fab', 'fa-github');

  p.innerText = formatProjectName(project);
  img.src = `/${project}/design/${project}.gif`;

  linkGithub.href = `https://github.com/maurodesouza/frontloops-challenge-elements/tree/master/${project}/dist`;
  linkGithub.target = '_blank';

  linkGithub.append(i);
  info.append(p, linkGithub);

  linkView.append(img, info);
  li.append(linkView);

  projectsElement.append(li);
})





