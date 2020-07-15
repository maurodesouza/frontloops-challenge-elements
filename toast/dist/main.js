class Toast {
  constructor() {
    this.time = null;

    this.isShow = false;
    this.createToast();
  }

  hide = () => {
    this.time = setTimeout(() => {
      this.isShow = false;
      this.toast.classList.remove('show');
    }, 1500);
  }

  show = (message, params) => {
    if (this.isShow) return;

    const options = params || {};

    this.toast.classList.add('show');

    this.isShow = true;

    this.changeMessage(message);
    this.changeType(options.type || 'default');

    this.hide();
  }

  changeMessage = message => this.toast.innerText = message;

  changeType = type => {
    
    if (type === 'error') this.toast.classList.add('error');

    if (type === 'default') this.toast.classList.remove('error');

  }

  createToast = () => {
    this.toast = document.createElement('div');

    this.toast.onmouseover = () => clearTimeout(this.time);
    this.toast.onmouseleave = this.hide;

    this.toast.classList.add('toast');

    document.body.append(this.toast);
  }
}

const toast = new Toast();

document.querySelector('.show-message').addEventListener('click', () => {
  toast.show('Just a usual message');
})

document.querySelector('.show-alert').addEventListener('click', () => {
  toast.show('Here is your error', { type: 'error' });
})
