const rgbValue = document.getElementById("rgbValue");
const options = document.getElementById("options");
const message = document.getElementById("message");
const scoreLabel = document.getElementById("score");
const newGame = document.getElementById("newGame");

let correctColor = "";
let score = 0;

function randomNumber() {
  return Math.floor(Math.random() * 256);
}

function randomColor() {
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}

function setupRound() {
  options.innerHTML = "";
  message.textContent = "Choose one tile to start.";

  const colors = Array.from({ length: 6 }, randomColor);
  correctColor = colors[Math.floor(Math.random() * colors.length)];
  rgbValue.textContent = correctColor.toUpperCase();

  colors.forEach((color) => {
    const button = document.createElement("button");
    button.className = "color-btn";
    button.style.background = color;
    button.addEventListener("click", () => handleGuess(button, color));
    options.appendChild(button);
  });
}

function handleGuess(button, color) {
  const buttons = document.querySelectorAll(".color-btn");

  if (color === correctColor) {
    score += 1;
    scoreLabel.textContent = score;
    message.textContent = "Correct! Start a new round.";
    buttons.forEach((item) => {
      item.style.background = correctColor;
      item.disabled = true;
    });
  } else {
    button.disabled = true;
    button.style.opacity = "0.2";
    message.textContent = "Wrong choice. Try another tile.";
  }
}

newGame.addEventListener("click", setupRound);

setupRound();
