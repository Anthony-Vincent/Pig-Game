'use strict';

//selecting score elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0'); // you can also do this by doing getElementById().  get element by id is qupposedly faster if selecting thousands of elements at once
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions

let scores, currentScore, activePlayer, playing; // we are just declaring these variables so they can exist when the functuion is run.  otherwise the variables will only exist inside if the init function.

const init = function () {
  //all visible elements

  scores = [0, 0]; // scores for players 0 and 1.  the reason we are using player 0 and player 1 is because we are storing the two scores in an array.  Arrays are zero based!  these are the final scores
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');

  // all internal state variables
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //using the toggle method is kind of like an if else statment for switcching between classes on two elements
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
  diceElement.classList.add('hidden');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. start by generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display the dice roll
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //3. check for a 1. if true, switch tot he next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Holding score fuinctionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to final score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //3. check score is 100.  if so, finish the game. if not, switch to next player
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// new game functionality(challenge attempt)
// btnNew.addEventListener('click', function () {
//   //set all scores back to 0
//   scores = [0, 0];
//   currentScore = 0;
//   score0Element.textContent = 0;
//   score1Element.textContent = 0;
//   document.getElementById('current--0').textContent = 0;
//   currentScore1 = 0;
//   document.getElementById('current--1').textContent = 0;

//   //set active player to 0
//   activePlayer = 0;

//   //remove winner class
//   if (player0Element.classList.contains('player--winner')) {
//     document.querySelector('.player--0').classList.remove('player--winner');
//   }
//   if (player1Element.classList.contains('player--winner')) {
//     document.querySelector('.player--1').classList.remove('player--winner');
//   }

//   //set active player to zero
//   switchPlayer();
//   // hide dice
//   //   diceElement.classList.add('hidden');
// });

//new game functionlity
btnNew.addEventListener('click', init); // when passing a function as an argument instead of an anonymous function, we dont need to use () because JS will do it for us
