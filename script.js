'use strict';

const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore0Element = document.getElementById("current--0");
const currentScore1Element = document.getElementById("current--1");

let scores, currentScore, activePlayer, isGameRunning;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isGameRunning = true;

    player0Element.classList.add("player--active");
    player1Element.classList.remove("player--active");
    player0Element.classList.remove("player--winner");
    player1Element.classList.remove("player--winner");

    diceElement.classList.add("hidden");
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore0Element.textContent = 0;
    currentScore1Element.textContent = 0;
}

init();

const switchPlayer = function () {
    if (isGameRunning) {
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0Element.classList.toggle("player--active");
        player1Element.classList.toggle("player--active");
    }
}

const rollDice = function () {
    if (isGameRunning) {
        const randomNumber = Math.trunc(Math.random() * 6) + 1;
        diceElement.classList.remove("hidden");
        diceElement.src = `dice-${randomNumber}.png`;

        if (randomNumber !== 1) {
            currentScore += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
}

const hold = function () {
    if (isGameRunning) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            isGameRunning = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            diceElement.classList.add("hidden");
        } else {
            switchPlayer();
        }
    }
}

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", hold);
btnNew.addEventListener("click", init)
