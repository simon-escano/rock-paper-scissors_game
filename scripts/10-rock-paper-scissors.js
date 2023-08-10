let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, draws: 0};

updateGameScore();

function playGame(moveUser){
  const moveComputer = pickMoveComputer();
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

function pickMoveComputer() {
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
  score.wins = 0; score.losses = 0; score.draws = 0;
  localStorage.removeItem('score');
  updateGameScore();
}