class SnowFlakes {
  constructor() {
    var snowFlakes = document.querySelectorAll('.snow-flake');

    for (var snowFlake of snowFlakes) {
      var deg = Math.random() * 360;
      var scale = 0.2 + Math.random() * 0.8;

      snowFlake.style.left = Math.random() * 100 + '%';
      snowFlake.style.top = 10 + Math.random() * 50 + '%';
      snowFlake.style.transform =
        'matrix(' +
        [
          Math.cos(toRadian(deg)) * scale,
          -Math.sin(toRadian(deg)) * scale,
          Math.sin(toRadian(deg)) * scale,
          Math.cos(toRadian(deg)) * scale,
          0,
          0,
        ] +
        ')';
    }
  }
}
