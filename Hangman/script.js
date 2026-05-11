const wordElement = document.getElementById("word");
const message = document.getElementById("message");
const wrongLeft = document.getElementById("wrongLeft");
const usedLetters = document.getElementById("usedLetters");
const letters = document.getElementById("letters");
const restartButton = document.getElementById("restart");

const words = ["JAVASCRIPT", "BROWSER", "PUZZLE", "CODING", "CANVAS", "BUTTON", "WINDOW", "PLAYER"];

let selectedWord = "";
let guessedLetters = [];
let remainingWrong = 6;
let gameOver = false;

function renderWord() {
  wordElement.innerHTML = "";

  selectedWord.split("").forEach((letter) => {
    const box = document.createElement("div");
    box.className = "letter-box";
    box.textContent = guessedLetters.includes(letter) ? letter : "";
    wordElement.appendChild(box);
  });
}

function renderUsedLetters() {
  usedLetters.textContent = guessedLetters.length ? guessedLetters.join(", ") : "None";
}

function finishGame(text) {
  message.textContent = text;
  gameOver = true;
  document.querySelectorAll(".letters button").forEach((button) => {
    button.disabled = true;
  });
}

function checkGameState() {
  const won = selectedWord.split("").every((letter) => guessedLetters.includes(letter));

  if (won) {
    finishGame("You guessed the word.");
    return;
  }

  if (remainingWrong === 0) {
    finishGame(`You lost. The word was ${selectedWord}.`);
  }
}

function chooseLetter(letter, button) {
  if (gameOver) {
    return;
  }

  button.disabled = true;
  guessedLetters.push(letter);
  renderUsedLetters();

  if (selectedWord.includes(letter)) {
    message.textContent = "Good guess.";
    renderWord();
  } else {
    remainingWrong -= 1;
    wrongLeft.textContent = remainingWrong;
    message.textContent = "Wrong guess.";
  }

  checkGameState();
}

function buildKeyboard() {
  letters.innerHTML = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  alphabet.split("").forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => chooseLetter(letter, button));
    letters.appendChild(button);
  });
}

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  remainingWrong = 6;
  gameOver = false;
  wrongLeft.textContent = remainingWrong;
  message.textContent = "Choose a letter to begin.";
  renderUsedLetters();
  renderWord();
  buildKeyboard();
}

restartButton.addEventListener("click", startGame);

startGame();
