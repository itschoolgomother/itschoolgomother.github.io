var santa = document.getElementById('santa');
var olaf = document.getElementById('olaf');
var gift1 = document.getElementById('gift1');
var gift2 = document.getElementById('gift2');
var score_table = document.getElementById('score_table');
var score = document.getElementById('score');
var lost = document.getElementById('lost');
var start = document.getElementById('start');
var rules = document.getElementById('rules');
var music = new Audio('music/music.mp3');

var santa_x = 0;
var santa_y = 10;
var santa_direction = 1;
var santa_speed = 0.5;

var olaf_x = 10;

var gift1_x;
var gift1_y;
var gift1_show = false;
var gift2_x;
var gift2_y;
var gift2_show = false;

start.addEventListener('click', start_game);
document.addEventListener('keydown', move_olaf);

function start_game() {
  music.play();
  score.innerText = 0;
  lost.innerText = 0;

  start.style.visibility = 'hidden';
  rules.style.visibility = 'hidden';
  olaf.style.visibility = 'visible';
  santa.style.visibility = 'visible';
  score_table.style.visibility = 'visible';

  setInterval(() => {
    move_santa();
    move_gifts();
    check_catch();
  }, 50);
}

function move_olaf(event) {
  if (event.keyCode === 37) {
    // стрілка вліво
    olaf_x = olaf_x - 1;
    if (olaf_x < 0) olaf_x = 0;
  }
  if (event.keyCode === 39) {
    // стрілка вправо
    olaf_x = olaf_x + 1;
    if (olaf_x > 95) olaf_x = 95;
  }

  olaf.style.left = olaf_x + '%';
}

function move_santa() {
  santa_x = santa_x + santa_direction * santa_speed;

  // перевіримо якшо Санта вилитів за екран
  if (santa_x > 95) {
    // міняємо напрямок в якому летить санта
    santa_direction = -1;
    // повертаємо картинку санти
    santa.style.transform = 'scaleX(1)';
  }
  if (santa_x < 1) {
    santa_direction = 1;
    santa.style.transform = 'scaleX(-1)';
  }
  // рухаємо Санту на екрані
  santa.style.left = santa_x + '%';
  santa.style.top = santa_y + '%';
}

function move_gifts() {
  if (gift1_show !== true) {
    if (Math.random() > 1 - 0.05) {
      gift1_show = true;
      gift1_x = santa_x;
      gift1_y = santa_y;
      gift1.style.visibility = 'visible';
      return;
    }
  } else {
    if (gift1_y > 100) {
      gift1_show = false;
      gift1.style.visibility = 'hidden';
      lost.innerText = parseInt(lost.innerText) + 1;
    } else {
      gift1_y = gift1_y + 1;
    }

    gift1.style.left = gift1_x + '%';
    gift1.style.top = gift1_y + '%';
  }

  if (gift2_show !== true) {
    if (Math.random() > 1 - 0.02) {
      gift2_show = true;
      gift2_x = santa_x;
      gift2_y = santa_y;
      gift2.style.visibility = 'visible';
    }
  } else {
    if (gift2_y > 100) {
      gift2_show = false;
      gift2.style.visibility = 'hidden';
      lost.innerText = parseInt(lost.innerText) + 1;
    } else {
      gift2_y = gift2_y + 1;
    }

    gift2.style.left = gift2_x + '%';
    gift2.style.top = gift2_y + '%';
  }
}

function check_catch() {
  if (gift1_y > 80) {
    if (gift1_x > olaf_x && gift1_x < olaf_x + 10) {
      gift1_show = false;
      gift1_y = 0;
      gift1.style.visibility = 'hidden';

      score.innerText = parseInt(score.innerText) + 1;

      santa_speed = santa_speed + 0.1;
    }
  }

  if (gift2_y > 80) {
    if (gift2_x > olaf_x && gift2_x < olaf_x + 10) {
      gift2_show = false;
      gift2_y = 0;
      gift2.style.visibility = 'hidden';

      score.innerText = parseInt(score.innerText) + 1;

      santa_speed = santa_speed + 0.1;
    }
  }
}
