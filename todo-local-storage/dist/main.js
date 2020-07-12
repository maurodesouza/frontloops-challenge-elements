class Task {
  constructor() {
    this.form = document.querySelector('form');
    this.input = document.querySelector('.input');

    this.resetButton = document.querySelector('.reset-btn');
    this.outputTasks = document.querySelector('.tasks');
    
    this.tasks = [];

    this.init();
  }

  randomText = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let txt = '';

    for (let i = 0; i < 10; i++) {
      txt += chars.charAt(Math.random() * chars.length);
    }

    return txt;
  }

  onSubmit = e => {
    e.preventDefault();

    const value = this.input.value;

    if (value === '') return;

    this.createTask({ value, made: false,});

    this.input.value = '';
  }

  onReset = () => {
    document.querySelectorAll('.task').forEach(element => element.remove());

    this.tasks = [];
    this.save();
  }

  save = () => {
    localStorage.setItem('todo', JSON.stringify(this.tasks));
  }

  toggleMade = (element, key) => {
    element.style.transition = '.4s';
    element.classList.toggle('made');
    element.style.transition = 'unset';

    this.tasks = this.tasks.map(task => {
      if (task.key === key) return {...task, made: !task.made};

      return task;
    });

    this.save();
  }

  createTask = ({ value, made }) => {
    const p = document.createElement('p');
    const key = this.randomText();

    p.classList.add('task');
    p.innerText = value;

    if (made) p.classList.add('made');

    p.onclick = () => this.toggleMade(p, key);

    this.outputTasks.append(p);

    this.tasks = [...this.tasks, {value, made, key}];
    this.save();
  }

  addEvents = () => {
    this.form.addEventListener('submit', this.onSubmit);
    this.resetButton.addEventListener('click', this.onReset);
  }

  getTodoSave = () => {
    const tasks = JSON.parse(localStorage.getItem('todo'));

    if (!tasks) return;

    tasks.forEach(taks => this.createTask(taks));
  }

  init = () => {
    this.addEvents();
    this.getTodoSave();
  }
}

new Task();
