'use strict';

const scoreOne = document.querySelector('#score--0');
const scoreTwo = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

let currentScore, activePlayer, playing, scores;

const init = function () {
  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  current0EL.textContent = 0;
  document.getElementById('current--1').textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  currentScore = 0;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? (activePlayer = 1) : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

scoreOne.textContent = 0;
scoreTwo.textContent = 0;
diceEl.classList.add('hidden');

btnRollEl.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the other player

      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener('click', function () {
  // Add current score to active player score

  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if the current score>=100
    // finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
    //Change active player
  }
});

btnNewEl.addEventListener('click', init);

// if you don't want to call the function and let javascript call the function as
//soon as the button is clicked, don't use paranthesis
// basically paranthesis call the function
