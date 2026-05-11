const grid = document.getElementById("grid");
const movesLabel = document.getElementById("moves");
const restartButton = document.getElementById("restart");
const message = document.getElementById("message");

const icons = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F"];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildBoard() {
  grid.innerHTML = "";
  const shuffled = shuffle([...icons]);

  shuffled.forEach((icon) => {
    const button = document.createElement("button");
    button.className = "memory-card";
    button.dataset.icon = icon;
    button.textContent = icon;
    button.addEventListener("click", () => flipCard(button));
    grid.appendChild(button);
  });
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("matched")) {
    return;
  }

  card.classList.add("open");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;
  moves += 1;
  movesLabel.textContent = moves;

  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs += 1;
    resetTurn();

    if (matchedPairs === icons.length / 2) {
      message.textContent = `You won in ${moves} moves.`;
    } else {
      message.textContent = "Great match. Keep going.";
    }
  } else {
    message.textContent = "Not a match. Try again.";
    setTimeout(() => {
      firstCard.classList.remove("open");
      secondCard.classList.remove("open");
      resetTurn();
    }, 700);
  }
}

function startGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  moves = 0;
  matchedPairs = 0;
  movesLabel.textContent = moves;
  message.textContent = "Match all the pairs to win.";
  buildBoard();
}

restartButton.addEventListener("click", startGame);

startGame();
