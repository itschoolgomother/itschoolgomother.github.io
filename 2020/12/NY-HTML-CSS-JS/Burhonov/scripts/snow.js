class Snow {
  constructor() {
    this.cnv = document.getElementById('canvas');
    this.ctx = this.cnv.getContext('2d');
    this.ctx.globalAlpha = 0.7;
    this.numSnowFlakes = 100;
    this.snowflakes = [];

    function delayCallback() {
      this.cnv.width = window.innerWidth;
      this.cnv.height = window.innerHeight;
    }

    function resizeHendler() {
      delay(delayCallback.bind(this), 100);
    }

    window.addEventListener('resize', resizeHendler.bind(this));

    this.cnv.width = window.innerWidth;
    this.cnv.height = window.innerHeight;

    for (var i = 0; i < this.numSnowFlakes; i++) {
      this.snowflakes.push({
        x: Math.random() * this.cnv.width,
        y: Math.random() * this.cnv.height,
        speed: 0.5 + Math.random() * 1,
        wave: 5 + Math.random() * 5,
        size: 2 + Math.random() * 3,
      });
    }

    requestAnimationFrame(this.snowing.bind(this));
  }

  updateSnowflakes() {
    for (var i in this.snowflakes) {
      this.snowflakes[i].y += this.snowflakes[i].speed;
      this.snowflakes[i].x +=
        Math.cos(this.snowflakes[i].y / this.snowflakes[i].wave) *
        (this.snowflakes[i].wave / 2);
      if (this.snowflakes[i].y > this.cnv.height) {
        this.snowflakes[i].x = Math.random() * this.cnv.width;
        this.snowflakes[i].y = 0;
        this.snowflakes[i].speed = 0.5 + Math.random() * 1;
        this.snowflakes[i].wave = 5 + Math.random() * 5;
        this.snowflakes[i].size = 2 + Math.random() * 3;
      }
    }
  }

  snowing() {
    this.updateSnowflakes();
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    this.ctx.fillStyle = '#fff';
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    this.ctx.shadowOffsetX = 2;
    this.ctx.shadowOffsetY = 2;
    this.ctx.shadowBlur = 2;

    for (var flake of this.snowflakes) {
      this.ctx.save();
      this.ctx.translate(flake.x, flake.y);
      this.ctx.beginPath();
      this.ctx.arc(0, 0, flake.size, toRadian(0), toRadian(360));
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(this.snowing.bind(this));
  }
}
