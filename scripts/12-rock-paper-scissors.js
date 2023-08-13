let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, draws: 0};

let autoplayInterval;

updateGameScore();

function playGame(moveUser){
  const moveComputer = pickMove();
  let result = '';

  if (moveUser !== moveComputer) {
    if (moveUser === '✊') {
      if (moveComputer === '✋') {
        result = 'YOU LOSE';
      } else {
        result = 'YOU WIN'
      }
    } else if (moveUser === '✋') {
      if (moveComputer === '✌️') {
        result = 'YOU LOSE';
      } else {
        result = 'YOU WIN';
      }
    } else {
      if (moveComputer === '✊') {
        result = 'YOU LOSE';
      } else {
        result = 'YOU WIN';
      }
    }
  } else {
    result = `DRAW!`;
  }

  if(result === 'YOU WIN') {
    score.wins++;
  } else if (result ==='YOU LOSE') {
    score.losses++;
  } else {
    score.draws++;
  }
  document.querySelector('.move-user').innerText = moveUser;
  document.querySelector('.game-result').innerText = result;
  document.querySelector('.move-computer').innerText = moveComputer;

  updateGameScore();

  localStorage.setItem('score', JSON.stringify(score));
}

function updateGameScore() {
  document.querySelector('.game-score-wins').innerText = score.wins;
  document.querySelector('.game-score-losses').innerText = score.losses;
  document.querySelector('.game-score-draws').innerText = score.draws;
}

function pickMove() {
  const randomNumber = Math.random();
  if(randomNumber < 1/3) {
    return '✊';
  } else if (randomNumber >= 1/3 && randomNumber <2/3) {
    return '✋';
  } else {
    return '✌️';
  }
}

function resetScore() {
  document.querySelector('.reset-confirmation').innerHTML = `
    <p class="confirmation-message">
      Are you sure you want to reset the score?
    </p>
    <div class="confirmation-buttons">
      <button class="yes-button">
        Yes
      </button>
      <button class="no-button">
        No
      </button>
    </div>`;
  
  document.querySelector('.yes-button').addEventListener('click', () => {
    score.wins = 0; score.losses = 0; score.draws = 0;
    localStorage.removeItem('score');
    updateGameScore();
    document.querySelector('.reset-confirmation').innerHTML = '';
  });

  document.querySelector('.no-button').addEventListener('click', () => {
    document.querySelector('.reset-confirmation').innerHTML = '';
  });
}

function autoplay() {
  const autoplayButton = document.querySelector('.autoplay-button');
  if (!autoplayButton.classList.contains('autoplay-button-toggled')) {
    autoplayButton.classList.add('autoplay-button-toggled');
    autoplayButton.innerHTML = 'STOP AUTO PLAY'
    autoplayInterval =  setInterval(() => {playGame(pickMove())}, 250);
  } else {
    autoplayButton.classList.remove('autoplay-button-toggled');
    autoplayButton.innerHTML = 'AUTOPLAY'
    clearInterval(autoplayInterval);
  }
}

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('✊');
  } else if (event.key === 'p') {
    playGame('✋');
  } else if (event.key === 's') {
    playGame('✌️');
  } else if (event.key === 'a') {
    autoplay();
  } else if (event.key ==='Backspace') {
    resetScore();
  }
})

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('✊');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('✋');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('✌️');
});

document.querySelector('.js-autoplay-button').addEventListener('click', () => {
  autoplay();
});

document.querySelector('.js-reset-button').addEventListener('click', () => {
  resetScore();
});

