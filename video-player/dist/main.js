class Video {
  constructor() {
    this.video = document.querySelector('.video');
    this.videoWrapper = document.querySelector('.video-wrapper');

    this.back10s = document.querySelector('.back');
    this.skip10s = document.querySelector('.skip');
    this.resetBtn = document.querySelector('.reset');

    this.progress = document.querySelector('.progress');

    this.addEvents();
  }

  play() {
    this.video.play();
    this.videoWrapper.classList.remove('paused');
  }

  pause() {
    this.video.pause();
    this.videoWrapper.classList.add('paused');
  }

  ended = () => {
    this.pause();
    this.reset();
  }

  back = () => {
    const time = this.video.currentTime;

    if (time < 10) this.reset();
    else this.video.currentTime = time - 10;
  }

  skip = () => this.video.currentTime = this.video.currentTime + 10;

  reset = () => this.video.currentTime = 0;

  togglePlayVideo = () => {
    if (this.video.paused || this.video.ended) this.play();
    else this.pause();
  }

  updateProgress = () => {
    const progress = this.video.currentTime * 100 / this.video.duration;

    this.progress.style.width = `${progress}%`;
  }

  addEvents() {
    this.video.addEventListener('click', this.togglePlayVideo);
    this.video.addEventListener('timeupdate', this.updateProgress);
    this.video.addEventListener('ended', this.ended);

    this.back10s.addEventListener('click', this.back);
    this.skip10s.addEventListener('click', this.skip);

    this.resetBtn.addEventListener('click', this.reset);
  }
}

new Video();
