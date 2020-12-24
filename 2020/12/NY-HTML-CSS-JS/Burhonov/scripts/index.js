function startGame(game) {
  var welcome = document.getElementById('welcome');
  var bgSound = document.getElementById('bgSound');
  var bells = document.querySelectorAll('.bell');
  var progressBar = document.getElementById('progressBar');
  var buttons = document.getElementById('buttons');
  var gift = document.getElementById('gift');
  var progressBells = progressBar.querySelectorAll('img');

  var progress = 0;
  var melodyProgress = 0;
  var melody = '6.6.6...6.6.6...6.8.4.56...7.7.7.7.7.6.6...666.5.5.6.5...8';
  var notes = melody.replace(/\./g, '');
  var melodyPlaying = false;

  function playSong(note, currentNote) {
    var noteId = currentNote + '_' + note;
    var bellAudio = document.getElementById('audio_' + noteId);
    var bell = document.getElementById('note_' + noteId);
    var bellAnimation = bell.getElementById('bellAnimation' + currentNote);

    bellAnimation.beginElement();

    new Audio(bellAudio.currentSrc).play();

    if (currentNote == notes.charAt(progress)) {
      progressBells[progress].classList.add('hidden');
      progress++;
    } else {
      for (var progressBell of progressBells) {
        progressBell.classList.remove('hidden');
      }
      progress = 0;
    }

    if (progress == notes.length) {
      for (var bell of bells) {
        bell.removeEventListener('click', clickHandler);
      }

      window.removeEventListener('keyup', keyUpHandler);

      if (game) {
        buttons.classList.add('hidden');
        progressBar.classList.remove('shown');

        setTimeout(function () {
          gift.classList.add('shown');
          bgSound.controls = true;

          new Fireworks();
          bgSound.play();
        }, 500);
      } else {
        setTimeout(function () {
          for (var progressBell of progressBells) {
            progressBell.classList.remove('hidden');
          }

          melodyPlaying = false;
          welcome.classList.remove('hidden');
        }, 1000);
      }
    }
  }

  function playNote(noteChar) {
    var note = null;

    switch (noteChar) {
      case '1':
        note = 'do';
        break;
      case '2':
        note = 're';
        break;
      case '3':
        note = 'mi';
        break;
      case '4':
        note = 'fa';
        break;
      case '5':
        note = 'sol';
        break;
      case '6':
        note = 'la';
        break;
      case '7':
        note = 'la_sharp';
        break;
      case '8':
        note = 'do';
        break;
      case '9':
        note = 're';
        break;
    }

    if (note) {
      playSong(note, noteChar);
    }
  }

  function demoSong() {
    if (melodyProgress < melody.length) {
      setTimeout(function () {
        var noteChar = melody.charAt(melodyProgress);

        playNote(noteChar);

        melodyProgress++;
        demoSong();
      }, 150);
    }
  }

  function keyUpHandler(event) {
    if (event.ctrlKey && event.key == '0' && !melodyPlaying) {
      progress = 0;
      melodyPlaying = true;
      demoSong();
      return;
    }

    playNote(event.key);
  }

  function clickHandler(event) {
    if (event.target.tagName == 'image') {
      playNote(event.currentTarget.dataset.note);
    }
  }

  if (game) {
    window.addEventListener('keyup', keyUpHandler);

    for (var bell of bells) {
      bell.addEventListener('click', clickHandler);
    }

    progressBar.classList.add('shown');
  } else {
    demoSong();
  }

  welcome.classList.add('hidden');
}

function initScene() {
  document.title = document.title + ' ' + new Date().getFullYear();

  new SnowFlakes();
  new Snow();
}

document.addEventListener('DOMContentLoaded', initScene);
