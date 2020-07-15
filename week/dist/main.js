class Week {
  constructor() {
    this.backWeekButton = document.querySelector('.back');
    this.nextWeekButton = document.querySelector('.next');

    this.output = document.querySelector('.content');

    this.today = new Date();
    this.currentDate = new Date();

    this.week = [];

    this.init();
  }

  renderWeek = () => {
    this.output.innerHTML = '';

    this.week.forEach(day => {
      const date = new Date(day);

      const el = document.createElement('p');
      el.classList.add('day');

      if (date.getDate() === this.today.getDate() && date.getMonth() === this.today.getMonth())
        el.classList.add('current');

      const text = date.toLocaleDateString('default', {
        month: 'short',
        day: '2-digit',
      }).replace(/(\d*)(\s\w*\s)(\w{3})(.)/g, '$3 $1');

      el.innerText = text;

      this.output.append(el);
    })
  }

  backWeek = () => {
    const monday = new Date(this.week[0]).getTime();
    this.currentDate = new Date(monday - (1000 * 60 * 60 * 24 * 7));

    this.week = [];
    this.getWeek();
  }

  nextWeek = () => {
    const monday = new Date(this.week[0]).getTime();
    this.currentDate = new Date(monday + (1000 * 60 * 60 * 24 * 7));

    this.week = [];
    this.getWeek();
  }

  getWeek = () => {
    for (let i = 1; i < 8; i++) {
      const first = this.currentDate.getDate() - this.currentDate.getDay() + i;
      const day = new Date(this.currentDate.setDate(first)).toISOString().slice(0, 10);
      
      this.week.push(day);
    }
    
    this.renderWeek();
  }

  addEvents = () => {
    this.backWeekButton.addEventListener('click', this.backWeek);
    this.nextWeekButton.addEventListener('click', this.nextWeek);
  }

  init = () => {
    this.addEvents();
    this.getWeek();
  }
}

new Week();
