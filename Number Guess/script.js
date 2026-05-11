const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const attemptsLabel = document.getElementById("attempts");
const restartButton = document.getElementById("restart");

let secretNumber = 0;
let attemptsLeft = 10;
let finished = false;

function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 10;
  finished = false;
  attemptsLabel.textContent = attemptsLeft;
  message.textContent = "You have 10 attempts.";
  guessInput.value = "";
  guessInput.focus();
}

function submitGuess() {
  if (finished) {
    message.textContent = "Start a new game to play again.";
    return;
  }

  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "Enter a valid number between 1 and 100.";
    return;
  }

  attemptsLeft -= 1;
  attemptsLabel.textContent = attemptsLeft;

  if (guess === secretNumber) {
    message.textContent = `Correct! The number was ${secretNumber}.`;
    finished = true;
    return;
  }

  if (attemptsLeft === 0) {
    message.textContent = `Game over. The number was ${secretNumber}.`;
    finished = true;
    return;
  }

  message.textContent = guess < secretNumber ? "Too low. Try a bigger number." : "Too high. Try a smaller number.";
  guessInput.value = "";
  guessInput.focus();
}

guessButton.addEventListener("click", submitGuess);
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitGuess();
  }
});
restartButton.addEventListener("click", startGame);

startGame();
