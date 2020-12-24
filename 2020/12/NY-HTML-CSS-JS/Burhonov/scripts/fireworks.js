class Fireworks {
  constructor() {
    this.fireworksSound = document.getElementById('fireworksSound');
    this.fireworks = document.getElementById('fireworks');

    this.numFireworks = 5;

    function timer() {
      this.start();
    }

    function endedHandler() {
      this.fireworks.classList.remove('shown');
      this.numFireworks--;

      if (this.numFireworks) {
        setTimeout(timer.bind(this), 500);
      } else {
        var sendMail = document.getElementById('send-mail');

        sendMail.classList.add('shown');
      }
    }

    fireworksSound.addEventListener('ended', endedHandler.bind(this));

    this.start();
  }

  start() {
    this.fireworks.style.left =
      Math.random() * (window.innerWidth - this.fireworks.width);
    this.fireworks.classList.add('shown');
    this.fireworksSound.play();
  }
}
